export const COUNTRIES = [
  { code: "AE", name: "United Arab Emirates", currency: "AED" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "PK", name: "Pakistan", currency: "PKR" },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];

type MarketPrice = {
  amount: number;
  currency: string;
};

// Add approved market prices here. Countries without one use the enquiry flow.
const MARKET_PRICES: Partial<Record<CountryCode, MarketPrice>> = {
  AE: { amount: 250, currency: "AED" },
};

export const PACKAGE_DETAILS = {
  lessonMinutes: 30,
  classesPerWeek: 5,
  trialIsFree: true,
};

export function isCountryCode(value: string | null | undefined): value is CountryCode {
  return COUNTRIES.some((country) => country.code === value?.toUpperCase());
}

export function getCountry(code: CountryCode) {
  return COUNTRIES.find((country) => country.code === code)!;
}

export function getMarketPrice(code: CountryCode) {
  return MARKET_PRICES[code] ?? null;
}
