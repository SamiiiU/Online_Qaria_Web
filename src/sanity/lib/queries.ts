export const pageByPathQuery = `*[_type == "page" && path.current == $path && enabled != false][0]{
  _id,
  _updatedAt,
  title,
  "path": path.current,
  eyebrow,
  summary,
  seo,
  sections[]{
    _key,
    _type,
    title,
    muted,
    body,
    items[]{_key, title, text, href, question, answer}
  },
  cta
}`;

export const publishedPagePathsQuery = `*[_type == "page" && enabled != false]{
  "path": path.current,
  _updatedAt,
  seo
}`;

export const publishedPostsQuery = `*[_type == "post" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true] | order(publishedAt desc){
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  updatedAt,
  seo
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  updatedAt,
  body,
  seo
}`;

export const marketPricesQuery = `*[_type == "marketPrice" && enabled == true]{
  countryCode,
  countryName,
  currency,
  amount
}`;
