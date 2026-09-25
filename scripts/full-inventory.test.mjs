import {test} from 'node:test';
import assert from 'node:assert/strict';
import {animationStandard} from './pack-budget.mjs';
import {validateFullInventory} from './full-inventory.mjs';
const config=()=>({
 motions:animationStandard.coreMotionRoles.map((role,i)=>({id:'motion-'+i,role,...(i===0?{segments:animationStandard.personalityMoments.map(moment=>({id:'scene-'+moment,moment}))}:{})})),
 effects:animationStandard.operationalStates.map(role=>({id:'fx-'+role,role}))
});
test('all five personality moments required; spin is only an optional extra',()=>{
 assert.equal(validateFullInventory(config()),true);
 for(const moment of animationStandard.personalityMoments){
  const c=config();c.motions[0].segments=c.motions[0].segments.filter(s=>s.moment!==moment);
  c.motions[0].segments.push({id:'spin',moment:'spin'});
  assert.throws(()=>validateFullInventory(c),new RegExp('MISSING_PERSONALITY_MOMENT:'+moment));
 }
 const c=config();c.motions[0].segments.push({id:'mushroom-juggle'});assert.equal(validateFullInventory(c),true);
});
test('sprite operational feedback can use effects or body clips',()=>{
 const c=config();c.effects=c.effects.filter(e=>e.role!=='offline');
 assert.throws(()=>validateFullInventory(c),/MISSING_OPERATIONAL_PRESENTATION:offline/);
 c.motions.push({id:'offline',role:'states/offline'});assert.equal(validateFullInventory(c),true);
});
