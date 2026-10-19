import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.TEST_BASE_URL || 'http://localhost:3001';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`${base}/reviews/newReview`);
    await page.getByRole('heading', { name: 'Leave your experience with us' }).waitFor();
    await page.locator('input[name="display_name"]').fill('Test parent');
    await page.locator('input[name="city"]').fill('Karachi');
    await page.getByRole('textbox', { name: 'Phone number without country code' }).fill('3001234567');
    await page.locator('select[name="duration"]').selectOption('1-3 months');
    for (const name of ['punctuality', 'clarity', 'patience', 'communication']) {
      await page.locator(`input[name="${name}"][value="4"]`).check({ force: true });
    }
    await page.locator('textarea[name="learned"]').fill('Joined Arabic letters became easier to understand.');
    await page.locator('textarea[name="experience"]').fill('The teacher explained corrections clearly in this isolated form test.');
    await page.locator('input[name="adult"]').check();
    await page.locator('input[name="consent"]').check();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `test-results/review-form-${viewport.width}.png`, fullPage: true });
    let attempts = 0; let requestKey;
    await page.route('**/api/reviews', async route => {
      const payload = route.request().postDataJSON();
      assert.equal(payload.phone, '+923001234567');
      assert.equal(payload.punctuality, 4);
      assert.equal(payload.consent, true);
      if (requestKey) assert.equal(payload.request_key, requestKey);
      requestKey = payload.request_key;
      attempts++;
      await route.fulfill({ status: attempts === 1 ? 503 : 201, contentType: 'application/json', body: JSON.stringify(attempts === 1 ? { error: 'Temporary test failure' } : { success: true }) });
    });
    await page.getByRole('button', { name: 'Submit for verification' }).click();
    await page.getByText('Temporary test failure').waitFor();
    assert.equal(await page.locator('input[name="display_name"]').inputValue(), 'Test parent');
    await page.getByRole('button', { name: 'Submit for verification' }).click();
    await page.getByRole('heading', { name: 'Thank you for sharing' }).waitFor();
    await page.goto(`${base}/reviews`);
    await page.getByRole('heading', { name: 'Parent and student reviews' }).waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `test-results/reviews-${viewport.width}.png`, fullPage: true });
    await page.goto(`${base}/admin/reviews`);
    await page.waitForURL('**/admin');
    await page.close();
  }
  const context = await browser.newContext();
  const denied = await context.request.post(`${base}/api/reviews`, { data: {}, headers: { Origin: 'https://unrelated.example' } });
  assert.equal(denied.status(), 403);
  const invalid = await context.request.post(`${base}/api/reviews`, { data: {}, headers: { Origin: base } });
  assert.equal(invalid.status(), 400);
  await context.close();
  console.log('Mobile/desktop layout, ratings, failure recovery, idempotent retry, success message, admin redirect and API rejection checks passed. Browser submissions were mocked; no live review was inserted.');
} finally { await browser.close(); }
