export function schedule(date = new Date()) {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', weekday: 'short' }).format(date);
  return { day, mode: ['Sun', 'Tue', 'Thu', 'Sat'].includes(weekday) ? 'content' : 'audit' };
}

export const articleSchema = {
  type: 'object', additionalProperties: false,
  required: ['title', 'summary', 'description', 'sections', 'reviewNotes'],
  properties: {
    title: { type: 'string' }, summary: { type: 'string' }, description: { type: 'string' },
    reviewNotes: { type: 'array', items: { type: 'string' } },
    sections: { type: 'array', items: {
      type: 'object', additionalProperties: false, required: ['heading', 'paragraphs'],
      properties: { heading: { type: 'string' }, paragraphs: { type: 'array', items: { type: 'string' } } },
    } },
  },
};

export function validateArticle(article) {
  const text = JSON.stringify(article);
  if (!article || typeof article !== 'object') throw new Error('Article missing');
  for (const [key, max] of [['title', 65], ['summary', 220], ['description', 165]]) {
    if (typeof article[key] !== 'string' || !article[key].trim() || article[key].length > max) throw new Error(`Invalid ${key}`);
  }
  if (/[<>\u2014]/u.test(text)) throw new Error('HTML or em dash in draft');
  if (!Array.isArray(article.reviewNotes) || article.reviewNotes.some(n => typeof n !== 'string')) throw new Error('Review notes missing');
  if (!Array.isArray(article.sections) || article.sections.length < 3 || article.sections.length > 12) throw new Error('Invalid sections');
  for (const section of article.sections) {
    if (typeof section.heading !== 'string' || !section.heading.trim() || !Array.isArray(section.paragraphs) || !section.paragraphs.length || section.paragraphs.some(p => typeof p !== 'string' || !p.trim())) throw new Error('Invalid section text');
  }
  const words = article.sections.flatMap(s => s.paragraphs).join(' ').split(/\s+/).length;
  if (words < 600 || words > 1600) throw new Error('Draft must contain 600-1600 words');
  return article;
}

export function toDraft(article, brief, now = new Date()) {
  validateArticle(article);
  const block = (text, style, i) => ({ _type: 'block', _key: `b${i}`, style, markDefs: [], children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }] });
  const body = [];
  for (const section of article.sections) {
    body.push(block(section.heading, 'h2', body.length));
    for (const paragraph of section.paragraphs) body.push(block(paragraph, 'normal', body.length));
  }
  for (const link of brief.links) {
    if (!/^\/(?!\/)[a-z0-9/-]*$/.test(link.href)) throw new Error('Invalid internal link');
    const item = block(link.label, 'normal', body.length);
    item.markDefs = [{ _key: 'link', _type: 'link', href: link.href }];
    item.children[0].marks = ['link'];
    body.push(item);
  }
  return {
    _id: `drafts.seo-${brief.slug}`, _type: 'post', title: article.title,
    slug: { _type: 'slug', current: brief.slug }, summary: article.summary,
    publishedAt: now.toISOString(), body,
    seo: { title: article.title, description: article.description, noIndex: false },
  };
}

export function selectBrief(briefs, posts, now = new Date()) {
  const occupied = new Set(posts.map(p => p.slug?.current).filter(Boolean));
  return briefs.find(b => b.approvedForDraft && !occupied.has(b.slug) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug) &&
    Number.isFinite(Date.parse(b.evidenceDate)) &&
    now.getTime() >= Date.parse(b.evidenceDate) &&
    now.getTime() - Date.parse(b.evidenceDate) <= 30 * 86400000);
}
