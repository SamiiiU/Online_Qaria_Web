"use client";

import { useEffect, useState } from "react";
import BookButton from "./BookButton";

type Country = { code: string; name: string; currency: string };
type PricingData = {
  confirmed: boolean;
  source: "saved" | "detected" | "none";
  country: Country | null;
  price: { amount: number; currency: string } | null;
  package: { lessonMinutes: number; classesPerWeek: number; trialIsFree: boolean };
  countries: Country[];
};

const fallbackCountries: Country[] = [
  { code: "AE", name: "United Arab Emirates", currency: "AED" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "PK", name: "Pakistan", currency: "PKR" },
];

const fallbackPrices: Record<string, { amount: number; currency: string }> = {
  AE: { amount: 250, currency: "AED" },
};

const fallbackPackage = { lessonMinutes: 30, classesPerWeek: 5, trialIsFree: true };

function localPricingData(countryCode: string, confirmed: boolean): PricingData {
  const country = fallbackCountries.find((item) => item.code === countryCode) ?? null;
  return {
    confirmed,
    source: confirmed ? "saved" : "none",
    country,
    price: country ? fallbackPrices[country.code] ?? null : null,
    package: fallbackPackage,
    countries: fallbackCountries,
  };
}

export default function PricingWidget() {
  const [data, setData] = useState<PricingData | null>(null);
  const [selected, setSelected] = useState("");
  const [choosing, setChoosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pricing")
      .then((response) => {
        if (!response.ok) throw new Error("Pricing could not be loaded.");
        return response.json() as Promise<PricingData>;
      })
      .then((result) => {
        setData(result);
        setSelected(result.country?.code ?? "");
        setChoosing(!result.country || !result.confirmed);
      })
      .catch(() => {
        const savedCountry = window.localStorage.getItem("oq_country") ?? "";
        setData(localPricingData(savedCountry, Boolean(savedCountry)));
        setSelected(savedCountry);
        setChoosing(!savedCountry);
      })
      .finally(() => setLoading(false));
  }, []);

  async function confirmCountry(countryCode: string) {
    if (!countryCode) {
      setError("Please choose your country.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryCode }),
      });
      if (!response.ok) throw new Error("Pricing API is unavailable.");
      const result = (await response.json()) as PricingData;
      setData(result);
      setSelected(result.country?.code ?? countryCode);
      setChoosing(false);
      window.localStorage.setItem("oq_country", result.country?.code ?? countryCode);
    } catch {
      const result = localPricingData(countryCode, true);
      window.localStorage.setItem("oq_country", countryCode);
      setData(result);
      setSelected(countryCode);
      setChoosing(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !data) {
    return <div className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white" aria-label="Loading local pricing" />;
  }

  const countries = data?.countries ?? fallbackCountries;

  if (choosing || !data?.confirmed) {
    return (
      <div className="rounded-xl border border-gold/35 bg-white p-6 shadow-lg sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">Your location</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
          {data?.source === "detected" && data.country ? `Are you in ${data.country.name}?` : "Choose your country"}
        </h2>
        <p className="mt-2 text-muted">We use your country only to show the correct local pricing. You can change it at any time.</p>
        <label htmlFor="pricing-country" className="mt-6 block text-sm font-semibold text-navy">Country</label>
        <select id="pricing-country" value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30">
          <option value="">Select your country</option>
          {countries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
        </select>
        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        <button type="button" disabled={loading} onClick={() => confirmCountry(selected)} className="mt-5 w-full cursor-pointer rounded-lg bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft disabled:opacity-60">
          {loading ? "Loading..." : "Confirm country"}
        </button>
        <p className="mt-3 text-center text-xs text-muted">No GPS or precise location is requested.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/35 bg-white p-6 shadow-lg sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm text-muted">Showing pricing for</p><p className="font-semibold text-navy">{data.country?.name}</p></div>
        <button type="button" onClick={() => setChoosing(true)} className="cursor-pointer text-sm font-semibold text-gold hover:text-navy">Change country</button>
      </div>
      <div className="mt-6 border-t border-slate-200 pt-6">
        {data.price ? (
          <p><span className="font-serif text-5xl font-bold text-navy">{data.price.currency} {data.price.amount}</span><span className="text-muted"> / month</span></p>
        ) : (
          <><p className="font-serif text-3xl font-bold text-navy">Local pricing on request</p><p className="mt-2 text-muted">Book a free demo and we will confirm the price in {data.country?.currency} before you enrol.</p></>
        )}
        <ul className="mt-6 space-y-3 text-ink">
          <li>{data.package.lessonMinutes}-minute private lesson</li>
          <li>{data.package.classesPerWeek} classes each week</li>
          <li>Urdu-medium teaching with a female Qaria</li>
          <li>First demo class free</li>
        </ul>
        <BookButton className="mt-7 w-full rounded-lg bg-gold px-6 py-4 text-lg font-semibold text-white shadow-md hover:brightness-95" />
      </div>
    </div>
  );
}
