import test from 'node:test';
import assert from 'node:assert/strict';
import { verifySubscription, PLANS } from './verifySubscription.mjs';
const event = { httpMethod: 'POST', body: JSON.stringify({ session_id: 'cs_live_1234567890abcdefghijklmnop' }) };
const session = { payment_link: Object.keys(PLANS)[0], livemode: true, mode: 'subscription', subscription: 'sub_test_unique', status: 'complete', payment_status: 'paid', amount_total: 7248, currency: 'eur', customer_details: { email: 'private@example.com' } };
const run = (changes = {}) => verifySubscription(event, { secret: 'test-only', fetcher: async () => ({ ok: true, json: async () => ({ ...session, ...changes }) }) });
test('only server-confirmed initial subscription generates a net-value sale, with no personal data', async () => {
  const result = await run();
  assert.equal(result.statusCode, 200);
  assert.deepEqual(JSON.parse(result.body), { paid: true, transaction_id: 'sub_test_unique', value: 59.9, currency: 'EUR', plan: 'esencial', plan_name: 'Esencial' });
  assert.equal(result.headers['Cache-Control'], 'no-store');
});
test('all three plans have correct VAT-exclusive values', async () => {
  for (const [i, total] of [7248, 12088, 24188].entries()) {
    const result = await run({ payment_link: Object.keys(PLANS)[i], amount_total: total });
    assert.equal(JSON.parse(result.body).value, [59.9, 99.9, 199.9][i]);
  }
});
test('unpaid and unfinished sessions never become sales', async () => {
  for (const change of [{ payment_status: 'unpaid' }, { status: 'open' }, { payment_status: 'no_payment_required' }]) {
    const result = await run(change);
    assert.equal(result.statusCode, 202);
    assert.deepEqual(JSON.parse(result.body), { paid: false });
  }
});
test('rejects unrelated products, test mode, one-time payments and invalid amounts', async () => {
  for (const change of [{ payment_link: 'plink_other' }, { livemode: false }, { mode: 'payment' }, { subscription: null }, { currency: 'usd' }, { amount_total: 0 }, { amount_total: -1 }]) assert.equal((await run(change)).statusCode, 400);
});
test('invalid IDs and malformed requests cannot query Stripe', async () => {
  const options = { secret: 'test-only', fetcher: () => { throw new Error('must not call'); } };
  for (const body of ['{', '{}', '{"session_id":"cs_test_1234567890abcdefghijklmnop"}', '{"session_id":"../../foo"}']) assert.equal((await verifySubscription({ ...event, body }, options)).statusCode, 400);
  assert.equal((await verifySubscription({ httpMethod: 'GET' }, options)).statusCode, 405);
});
test('missing credentials and Stripe failures fail closed', async () => {
  assert.equal((await verifySubscription(event, { secret: '' })).statusCode, 503);
  assert.equal((await verifySubscription(event, { secret: 'test', fetcher: async () => ({ ok: false, status: 401 }) })).statusCode, 502);
  assert.equal((await verifySubscription(event, { secret: 'test', fetcher: async () => { throw new Error('timeout'); } })).statusCode, 502);
});
test('reloads use a stable subscription transaction ID for Ads deduplication', async () => {
  assert.equal(JSON.parse((await run()).body).transaction_id, JSON.parse((await run()).body).transaction_id);
});
