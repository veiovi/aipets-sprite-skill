import {test} from 'node:test';
import assert from 'node:assert/strict';
import {packBudget,packSizeReport} from './pack-budget.mjs';
test('sprite cap cannot be raised by config; smaller slots and budgets win',()=>{
 assert.equal(packBudget('sprite',{maxBytes:9000000,slotCapacityBytes:9000000}).limitBytes,3000000);
 assert.equal(packSizeReport('sprite',3000000).remainingBytes,0);
 assert.throws(()=>packSizeReport('sprite',3000001,{maxBytes:9000000,slotCapacityBytes:9000000}),/PACK_SIZE_LIMIT/);
 assert.equal(packBudget('sprite',{slotCapacityBytes:2752512}).limitBytes,2752512);
 assert.throws(()=>packSizeReport('sprite',2600001,{maxBytes:2600000}),/PACK_SIZE_LIMIT/);
 assert.deepEqual(packBudget('sprite').coreTargetBytes,{min:2400000,max:2550000});
});
test('H3 warning begins strictly above 10 MB and does not relax 12 MB cap',()=>{
 assert.deepEqual(packSizeReport('h3',10000000).warnings,[]);
 assert.equal(packSizeReport('h3',10000001).warnings.length,1);
 assert.equal(packSizeReport('h3',12000000).remainingBytes,0);
 assert.throws(()=>packSizeReport('h3',12000001,{slotCapacityBytes:20000000}),/PACK_SIZE_LIMIT/);
 assert.deepEqual(packBudget('h3').coreTargetBytes,{min:9600000,max:10200000});
 assert.deepEqual(packBudget('h3',{slotCapacityBytes:1000000}).coreTargetBytes,{min:800000,max:850000});
});
test('invalid capacities fail closed instead of disabling the cap',()=>{
 for(const value of [0,-1,NaN,Infinity,3000000.5,'3000000']){
  assert.throws(()=>packBudget('sprite',{slotCapacityBytes:value}),/INVALID_PACK_BUDGET/);
  assert.throws(()=>packBudget('h3',{maxBytes:value}),/INVALID_PACK_BUDGET/);
 }
});
