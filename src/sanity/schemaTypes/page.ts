import { defineArrayMember, defineField, defineType } from "sanity";

const linkValidation = (value: string | undefined) =>
  !value || value.startsWith("/") || value.startsWith("https://") || "Use a relative path or an HTTPS URL.";

export const pageType = defineType({
  name: "page",
  title: "SEO Pages",
  type: "document",
  fields: [
    defineField({ name: "enabled", title: "Published on website", type: "boolean", initialValue: true }),
    defineField({ name: "title", title: "Page title", type: "string", validation: (rule) => rule.required().max(80) }),
    defineField({
      name: "path",
      title: "URL path",
      type: "slug",
      description: "Use a stable path such as quran-classes-for-beginners. Changing it can break existing links.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Short label", type: "string", validation: (rule) => rule.max(40) }),
    defineField({ name: "summary", title: "Hero summary", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({
      name: "seo",
      title: "Search appearance",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO title", type: "string", validation: (rule) => rule.max(65) }),
        defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (rule) => rule.max(165) }),
        defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "textSection",
          title: "Text section",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "muted", title: "Use alternate background", type: "boolean", initialValue: false }),
            defineField({
              name: "body",
              type: "array",
              of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 3", value: "h3" }] }],
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          name: "cardSection",
          title: "Card section",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "muted", title: "Use alternate background", type: "boolean", initialValue: false }),
            defineField({
              name: "items",
              type: "array",
              validation: (rule) => rule.required().min(1).max(8),
              of: [defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
                  defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
                  defineField({ name: "href", title: "Optional link", type: "string", validation: (rule) => rule.custom(linkValidation) }),
                ],
              })],
            }),
          ],
        }),
        defineArrayMember({
          name: "faqSection",
          title: "FAQ section",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "muted", title: "Use alternate background", type: "boolean", initialValue: true }),
            defineField({
              name: "items",
              type: "array",
              validation: (rule) => rule.required().min(1).max(12),
              of: [defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
                  defineField({ name: "answer", type: "text", rows: 4, validation: (rule) => rule.required() }),
                ],
              })],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        defineField({ name: "enabled", type: "boolean", initialValue: true }),
        defineField({ name: "label", type: "string", initialValue: "Book a free demo", validation: (rule) => rule.max(40) }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "path.current" } },
});
