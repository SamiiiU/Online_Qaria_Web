import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

for (const [scenario, status, code] of [
  ['success', 'awaiting-owner-review', 0],
  ['preflight', 'preflight-passed', 0],
  ['completed', 'already-completed', 0],
  ['uncertain', 'failed', 1],
  ['ai-error', 'failed', 1],
  ['audit', 'checked', 0],
]) {
  test(`runner: ${scenario}`, async () => {
    const dir = await mkdtemp(join(tmpdir(), 'qaria-seo-test-'));
    try {
      await mkdir(join(dir, 'content/seo'), { recursive: true });
      await copyFile('content/seo/briefs.json', join(dir, 'content/seo/briefs.json'));
      const result = spawnSync(process.execPath, ['--import', pathToFileURL(resolve('tests/fixtures/seo-api-mock.mjs')).href, resolve('scripts/seo/run.mjs')], {
        cwd: dir, encoding: 'utf8', timeout: 15000,
        env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot, SEO_TEST_SCENARIO: scenario, SEO_MODE: scenario === 'preflight' ? 'preflight' : 'daily', XAI_MODEL: 'test-model', XAI_API_KEY: 'fake', SANITY_API_TOKEN: 'fake', CLICKUP_API_TOKEN: 'fake' },
      });
      assert.equal(result.status, code, result.stderr);
      assert.ok(!result.stdout.includes('do-not-log-private-response'));
      const report = JSON.parse(await readFile(join(dir, '.seo-output/report.json'), 'utf8'));
      assert.equal(report.status, status);
      assert.equal(report.publishedByWorker, 0);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
}
