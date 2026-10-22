import test from 'node:test';
import assert from 'node:assert/strict';
import { schedule, validateArticle, toDraft, selectBrief } from '../scripts/seo/core.mjs';

const brief = { slug: 'first-lesson', approvedForDraft: true, evidenceDate: '2026-10-18', links: [{ href: '/contact', label: 'Contact us' }] };
const article = () => ({ title: 'Preparing for a lesson', summary: 'Practical preparation.', description: 'Prepare for your first lesson.', reviewNotes: [], sections: Array.from({ length: 3 }, (_, i) => ({ heading: `Step ${i}`, paragraphs: ['Parent preparation '.repeat(110).trim()] })) });
test('Pakistan date boundary and content days', () => {
  assert.deepEqual(schedule(new Date('2026-10-21T20:00:00Z')), { day: '2026-10-22', mode: 'content' });
  assert.equal(schedule(new Date('2026-10-23T04:00:00Z')).mode, 'audit');
});
test('four content days and three audit days', () => {
  const modes = Array.from({ length: 7 }, (_, i) => schedule(new Date(`2026-10-${18 + i}T04:00:00Z`)).mode);
  assert.equal(modes.filter(m => m === 'content').length, 4);
});
test('output is draft-only with safe internal links', () => {
  const draft = toDraft(article(), brief);
  assert.equal(draft._id, 'drafts.seo-first-lesson');
  assert.equal(draft._type, 'post');
  assert.equal(draft.body.at(-1).markDefs[0].href, '/contact');
});
test('reject HTML, em dashes, short output and bad metadata', () => {
  for (const change of [{ title: '<script>' }, { summary: 'bad\u2014text' }, { description: 'a'.repeat(166) }, { sections: [] }]) {
    assert.throws(() => validateArticle({ ...article(), ...change }));
  }
});
test('reject external or protocol-relative internal links', () => {
  for (const href of ['//attacker.test', 'https://attacker.test', 'javascript:alert(1)']) {
    assert.throws(() => toDraft(article(), { ...brief, links: [{ href, label: 'Bad' }] }));
  }
});
test('skip occupied slugs, unapproved, stale and future evidence', () => {
  const now = new Date('2026-10-22T04:00:00Z');
  assert.equal(selectBrief([brief], [], now), brief);
  assert.equal(selectBrief([brief], [{ slug: { current: brief.slug } }], now), undefined);
  for (const change of [{ approvedForDraft: false }, { evidenceDate: '2026-01-01' }, { evidenceDate: '2027-01-01' }]) {
    assert.equal(selectBrief([{ ...brief, ...change }], [], now), undefined);
  }
});
