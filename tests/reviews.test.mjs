import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateReview, publicReviewColumns } from '../src/lib/reviews.ts';

const valid = {
  display_name: 'Parent from Karachi', role: 'Parent / guardian', city: 'Karachi', country: 'Pakistan',
  phone: '+923001234567', course: 'Noorani Qaida', duration: '1-3 months',
  learned: 'My child understands joined Arabic letters now.',
  experience: 'Corrections were explained clearly and my child could ask questions.',
  improvements: 'An earlier slot would help.', punctuality: 4, clarity: 5, patience: 5, communication: 3,
  consent: true, adult: true,
};
test('accepts critical feedback and strips attempts to approve or set private server fields', () => {
  const result = validateReview({ ...valid, punctuality: 1, status: 'approved', notification_sent_at: 'now' });
  assert.equal(result.punctuality, 1);
  assert.equal(result.improvements, valid.improvements);
  assert.equal('status' in result, false);
  assert.equal('notification_sent_at' in result, false);
});
test('requires explicit adult and publication consent', () => {
  for (const key of ['consent', 'adult']) for (const value of [false, undefined, 'true']) {
    assert.throws(() => validateReview({ ...valid, [key]: value }));
  }
});
test('rejects missing, fractional, text and out-of-range ratings', () => {
  for (const key of ['punctuality', 'clarity', 'patience', 'communication']) {
    for (const value of [0, 6, 1.5, '5', undefined]) assert.throws(() => validateReview({ ...valid, [key]: value }));
  }
});
test('rejects malformed phone, short experience and unsupported choices', () => {
  for (const change of [{ phone: '03001234567' }, { phone: '+92hello' }, { experience: 'Good' }, { country: 'Atlantis' }, { course: 'Unknown' }, { display_name: 'x'.repeat(61) }]) {
    assert.throws(() => validateReview({ ...valid, ...change }));
  }
});
test('public projection does not include private verification fields', () => {
  const columns = publicReviewColumns.split(',');
  for (const column of ['phone', 'submission_key', 'notification_sent_at', 'consent_at']) assert.equal(columns.includes(column), false);
});
