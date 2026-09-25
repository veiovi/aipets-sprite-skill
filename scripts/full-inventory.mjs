import {animationStandard} from './pack-budget.mjs';
export function validateFullInventory(config){
 const motions=config.motions??[],effects=config.effects??[];
 for(const role of animationStandard.coreMotionRoles)if(motions.filter(m=>m.role===role).length!==1)throw Error('CORE_INVENTORY_MISSING_OR_DUPLICATED:'+role);
 for(const state of animationStandard.operationalStates)if(!motions.some(m=>m.role==='states/'+state)&&!effects.some(e=>e.role===state))throw Error('MISSING_OPERATIONAL_PRESENTATION:'+state);
 const idle=motions.find(m=>m.role==='foundation/idle-breathing'),moments=(idle.segments??[]).map(s=>s.moment??s.id);
 for(const moment of animationStandard.personalityMoments)if(!moments.includes(moment))throw Error('MISSING_PERSONALITY_MOMENT:'+moment);
 const ids=[...motions,...effects].map(x=>x.id);
 if(new Set(ids).size!==ids.length)throw Error('DUPLICATE_INVENTORY_ID');
 if(effects.length>8||new Set(effects.map(e=>e.role)).size!==effects.length)throw Error('EFFECT_ROLE_LIMIT_OR_DUPLICATE');
 return true;
}
