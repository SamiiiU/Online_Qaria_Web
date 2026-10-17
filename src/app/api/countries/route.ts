import { NextRequest, NextResponse } from "next/server";

type ApiCountry = {
  name?: string;
  alpha2Code?: string;
  callingCodes?: string[];
};

export type PhoneCountry = {
  code: string;
  name: string;
  dialCode: string;
};

const COUNTRY_COOKIE = "oq_country";

// Primary Urdu-speaking and Pakistani diaspora markets, ordered by relevance.
const TARGET_COUNTRY_CODES = [
  "PK",
  "AE",
  "SA",
  "GB",
  "US",
  "CA",
  "QA",
  "OM",
  "KW",
  "BH",
  "AU",
  "DE",
  "IT",
  "FR",
  "ES",
  "NO",
  "DK",
  "NL",
  "IE",
  "ZA",
] as const;

const targetOrder = new Map(TARGET_COUNTRY_CODES.map((code, index) => [code, index]));
const DISPLAY_NAMES: Partial<Record<(typeof TARGET_COUNTRY_CODES)[number], string>> = {
  GB: "United Kingdom",
  US: "United States",
};

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      "https://countries.dev/countries?fields=name,alpha2Code,callingCodes",
      { next: { revalidate: 60 * 60 * 24 * 7 } },
    );

    if (!response.ok) throw new Error(`Country API returned ${response.status}`);

    const source = (await response.json()) as ApiCountry[];
    const countries = source
      .filter(
        (country): country is Required<ApiCountry> =>
          Boolean(
            country.name &&
            country.alpha2Code &&
            country.callingCodes?.[0] &&
            targetOrder.has(country.alpha2Code.toUpperCase() as (typeof TARGET_COUNTRY_CODES)[number]),
          ),
      )
      .map((country) => ({
        code: country.alpha2Code.toUpperCase(),
        name:
          DISPLAY_NAMES[country.alpha2Code.toUpperCase() as (typeof TARGET_COUNTRY_CODES)[number]] ??
          country.name,
        dialCode: `+${country.callingCodes[0].replace(/^\+/, "")}`,
      }))
      .sort(
        (a, b) =>
          (targetOrder.get(a.code as (typeof TARGET_COUNTRY_CODES)[number]) ?? 999) -
          (targetOrder.get(b.code as (typeof TARGET_COUNTRY_CODES)[number]) ?? 999),
      );

    const savedCountry = request.cookies.get(COUNTRY_COOKIE)?.value?.toUpperCase();
    const detectedCountry = request.headers.get("x-vercel-ip-country")?.toUpperCase();
    const availableCodes = new Set(countries.map((country) => country.code));
    const selectedCountry =
      (savedCountry && availableCodes.has(savedCountry) && savedCountry) ||
      (detectedCountry && availableCodes.has(detectedCountry) && detectedCountry) ||
      "AE";

    return NextResponse.json(
      { countries, selectedCountry },
      { headers: { "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Country list is temporarily unavailable." },
      { status: 503 },
    );
  }
}
