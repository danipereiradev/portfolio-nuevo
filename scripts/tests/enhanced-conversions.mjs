import { build } from 'esbuild';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { webcrypto, createHash } from 'node:crypto';
const bundle = await build({ entryPoints: ['src/utils/analytics.ts'], bundle: true, write: false, format: 'cjs', platform: 'node' });
function setup(allowed) {
 const calls=[];
 const context={module:{exports:{}}, crypto:webcrypto, TextEncoder, localStorage:{getItem:()=>JSON.stringify({analytics:allowed,advertising:allowed,updatedAt:Date.now()})}, window:{location:{pathname:'/'},gtag:(...args)=>calls.push(args),localStorage:{getItem:()=>null}}, document:{title:'Test'}};
 vm.runInNewContext(bundle.outputFiles[0].text,context);
 return {api:context.module.exports,calls,context};
}
const hash=s=>createHash('sha256').update(s).digest('hex');
for(const allowed of [false,true]) {
 const {api,calls}=setup(allowed);
 await Promise.all([api.trackGoogleAdsFormConversion({email:' A.B@gmail.com ',phone:'612 345 678'}),api.trackGoogleAdsFormConversion({email:'duplicate@example.com'})]);
 assert.equal(calls.filter(c=>c[0]==='event'&&c[1]==='conversion').length,1);
 const payload=calls.find(c=>c[0]==='set'&&c[1]==='user_data')[2];
 if(allowed) { assert.equal(payload.sha256_email_address,hash('ab@gmail.com')); assert.equal(payload.sha256_phone_number,hash('+34612345678')); }
 else assert.equal(payload,null);
 assert.equal(calls.at(-1)[2],null);
 assert.ok(!JSON.stringify(calls).includes('gmail.com'));
}
{
 const {api,calls,context}=setup(true);context.crypto={};
 await api.trackGoogleAdsFormConversion({email:'test@example.com'});
 assert.equal(calls.filter(c=>c[0]==='event').length,1);
}
{
 const {api,calls}=setup(true);await api.trackGoogleAdsFormConversion({phone:'612345678'});
 assert.equal(calls.find(c=>c[0]==='set')[2],null);
}
console.log('PASS: consent gating, normalization/hash, duplicate protection, cleanup, hash failure, phone-only fallback. No network requests.');
