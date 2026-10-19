import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Article title", type: "string", validation: (rule) => rule.required().max(90) }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", title: "Article summary", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "publishedAt", title: "Publication date", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "updatedAt", title: "Meaningful update date", type: "datetime" }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["https"] }) })],
              }),
            ],
          },
        }),
      ],
    }),
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
  ],
  orderings: [{ title: "Publication date", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt" } },
});
