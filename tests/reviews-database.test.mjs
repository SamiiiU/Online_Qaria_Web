import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

test('private database enforces pending, approval, revocation, phone privacy and duplicate protection', async () => {
  const db = new PGlite();
  try {
    await db.exec('create role anon; create role authenticated; create role service_role bypassrls; grant usage on schema public to anon, authenticated, service_role;');
    await db.exec(await readFile(new URL('../supabase/migrations/202610190001_reviews.sql', import.meta.url), 'utf8'));
    const payload = JSON.stringify({ display_name: 'Test parent', role: 'Parent / guardian', city: 'Karachi', country: 'Pakistan', phone: '+923001234567', course: 'Noorani Qaida', duration: '1-3 months', learned: 'Joined Arabic letters became much clearer.', experience: 'A test experience used only in an isolated database.', improvements: 'Earlier lessons would help.', punctuality: 1, clarity: 4, patience: 5, communication: 3 });
    await db.exec('set role service_role');
    const key = '11111111-1111-4111-8111-111111111111';
    const result = await db.query('select public.submit_student_review($1::jsonb, $2::uuid) as id', [payload, key]);
    const id = result.rows[0].id;
    const repeat = await db.query('select public.submit_student_review($1::jsonb, $2::uuid) as id', [payload, key]);
    assert.equal(repeat.rows[0].id, id);
    await assert.rejects(db.query('select public.submit_student_review($1::jsonb, $2::uuid)', [payload, '22222222-2222-4222-8222-222222222222']), /24 hours/);
    await db.exec('reset role; set role anon');
    assert.equal((await db.query('select * from public.approved_reviews')).rows.length, 0);
    await assert.rejects(db.query('select phone from public.student_reviews'), /permission denied/);
    await assert.rejects(db.query('select public.submit_student_review($1::jsonb, $2::uuid)', [payload, key]), /permission denied/);
    await db.exec('reset role; set role authenticated');
    await assert.rejects(db.query("update public.student_reviews set status = 'approved'"), /permission denied/);
    await db.exec('reset role; set role service_role');
    await db.query("update public.student_reviews set status = 'approved' where id = $1", [id]);
    await db.exec('reset role; set role anon');
    const publicRows = (await db.query('select * from public.approved_reviews')).rows;
    assert.equal(publicRows.length, 1);
    assert.equal(publicRows[0].punctuality, 1);
    assert.equal('phone' in publicRows[0], false);
    assert.equal('submission_key' in publicRows[0], false);
    await assert.rejects(db.query('select phone from public.approved_reviews'), /does not exist/);
    await db.exec('reset role; set role service_role');
    await db.query("update public.student_reviews set status = 'rejected' where id = $1", [id]);
    await db.exec('reset role; set role anon');
    assert.equal((await db.query('select * from public.approved_reviews')).rows.length, 0);
  } finally { await db.close(); }
});
