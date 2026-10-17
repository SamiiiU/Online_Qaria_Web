import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES, getCountry, getMarketPrice, isCountryCode, PACKAGE_DETAILS } from "../../../lib/pricing";
import { fetchSanity } from "../../../sanity/lib/client";
import { marketPricesQuery } from "../../../sanity/lib/queries";
import type { CmsMarketPrice } from "../../../sanity/lib/types";

const COUNTRY_COOKIE = "oq_country";

async function pricingResponse(countryCode: string | null, confirmed: boolean, source: "saved" | "detected" | "none") {
  const normalizedCode = countryCode?.toUpperCase();
  const code = isCountryCode(normalizedCode) ? normalizedCode : null;
  const country = code ? getCountry(code) : null;
  const cmsPrices = await fetchSanity<CmsMarketPrice[]>(marketPricesQuery);
  const cmsPrice = code ? cmsPrices?.find((item) => item.countryCode.toUpperCase() === code) : null;
  const price = cmsPrice ? { amount: cmsPrice.amount, currency: cmsPrice.currency } : code ? getMarketPrice(code) : null;

  return {
    confirmed,
    source,
    country,
    price,
    package: PACKAGE_DETAILS,
    countries: COUNTRIES,
  };
}

export async function GET(request: NextRequest) {
  const saved = request.cookies.get(COUNTRY_COOKIE)?.value;
  if (isCountryCode(saved)) {
    return NextResponse.json(await pricingResponse(saved, true, "saved"));
  }

  const detected = request.headers.get("x-vercel-ip-country");
  return NextResponse.json(await pricingResponse(detected, false, isCountryCode(detected) ? "detected" : "none"));
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { country?: string } | null;
  if (!isCountryCode(body?.country)) {
    return NextResponse.json({ error: "Please select a supported country." }, { status: 400 });
  }

  const code = body.country.toUpperCase();
  const response = NextResponse.json(await pricingResponse(code, true, "saved"));
  const isHttps = request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:";
  response.cookies.set(COUNTRY_COOKIE, code, {
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps,
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
  return response;
}
