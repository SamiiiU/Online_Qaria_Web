import { defineField, defineType } from "sanity";

export const marketPriceType = defineType({
  name: "marketPrice",
  title: "Country Pricing",
  type: "document",
  fields: [
    defineField({ name: "enabled", title: "Show this price", type: "boolean", initialValue: false }),
    defineField({ name: "countryName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "countryCode", title: "ISO country code", type: "string", validation: (rule) => rule.required().uppercase().length(2) }),
    defineField({ name: "currency", title: "ISO currency code", type: "string", validation: (rule) => rule.required().uppercase().length(3) }),
    defineField({ name: "amount", title: "Monthly amount", type: "number", validation: (rule) => rule.required().positive().precision(2) }),
  ],
  preview: {
    select: { title: "countryName", code: "countryCode", currency: "currency", amount: "amount", enabled: "enabled" },
    prepare: ({ title, code, currency, amount, enabled }) => ({
      title: `${title} (${code})`,
      subtitle: enabled ? `${currency} ${amount}` : "Hidden",
    }),
  },
});
