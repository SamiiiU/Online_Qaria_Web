import assert from 'node:assert/strict';

const RealDate = Date;
const fixedDate = process.env.SEO_TEST_SCENARIO === 'audit' ? '2026-10-23T04:00:00Z' : '2026-10-22T04:00:00Z';
globalThis.Date = class extends RealDate {
  constructor(...args) { super(...(args.length ? args : [fixedDate])); }
  static now() { return new RealDate(fixedDate).getTime(); }
};
let aiCalls = 0;
let writes = 0;
let draftWritten = false;
let notified = false;
const scenario = process.env.SEO_TEST_SCENARIO;
globalThis.fetch = async (input, options = {}) => {
  const url = new URL(input);
  const body = options.body ? JSON.parse(options.body) : null;
  const json = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });
  if (url.hostname.endsWith('api.sanity.io')) {
    if (url.pathname.includes('/query/')) {
      const q = url.searchParams.get('query');
      if (q.includes('_type == "post"')) return json({ result: [] });
      return json({ result: scenario === 'uncertain' ? { generationStarted: true } : scenario === 'completed' ? { completed: true } : null });
    }
    assert.ok(url.pathname.includes('/mutate/'));
    for (const mutation of body.mutations) {
      writes++;
      const doc = mutation.create || mutation.createIfNotExists;
      if (doc) assert.ok(doc._id.startsWith('drafts.'), 'No public document writes');
      if (doc?._type === 'post') draftWritten = true;
    }
    return json({ results: [] });
  }
  if (url.hostname === 'api.clickup.com') {
    if (url.pathname.endsWith('/comment')) { notified = true; return json({ id: 'comment' }); }
    if (url.pathname.endsWith('/task')) return json({ tasks: [{ id: 'existing-task', name: scenario === 'audit' ? '[SEO 2026-10-23] audit' : '[SEO 2026-10-22] content' }] });
    return json({ id: 'list' });
  }
  if (url.hostname === 'api.x.ai') {
    if (url.pathname.endsWith('/models')) return json({ data: [{ id: 'test-model' }] });
    aiCalls++;
    if (scenario === 'ai-error') return new Response('do-not-log-private-response', { status: 429 });
    return json({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify({ title: 'Preparing for a Quran lesson', summary: 'Practical parent preparation.', description: 'Prepare for a first lesson.', reviewNotes: [], sections: Array.from({ length: 3 }, (_, i) => ({ heading: `Step ${i}`, paragraphs: ['Prepare calmly '.repeat(110).trim()] })) }) } }], usage: { total_tokens: 900 } });
  }
  if (url.hostname === 'onlineqaria.com') return new Response('<urlset><title>Blog</title><link rel="canonical" href="https://onlineqaria.com/blog">');
  throw new Error(`Unexpected network request: ${url.hostname}`);
};
process.on('exit', () => {
  if (scenario === 'success') { assert.equal(aiCalls, 1); assert.equal(draftWritten, true); assert.equal(notified, true); }
  if (['preflight', 'completed', 'uncertain'].includes(scenario)) assert.equal(aiCalls, 0);
  if (scenario === 'preflight') assert.equal(writes, 0);
  if (scenario === 'audit') { assert.equal(aiCalls, 0); assert.equal(draftWritten, false); assert.equal(notified, true); }
  if (scenario === 'ai-error') { assert.equal(draftWritten, false); assert.equal(notified, true); }
});
