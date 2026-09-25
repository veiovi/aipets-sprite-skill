import {readFileSync} from 'node:fs';
export const animationStandard=JSON.parse(readFileSync(new URL('../references/animation-standard.json',import.meta.url),'utf8'));
const positive=(value,name)=>{if(!Number.isSafeInteger(value)||value<=0)throw Error('INVALID_PACK_BUDGET:'+name);return value;};
export function packBudget(format,config={}){
 const policy=animationStandard.formats[format];if(!policy)throw Error('UNKNOWN_PET_FORMAT:'+format);
 const slot=positive(config.slotCapacityBytes??policy.hardLimitBytes,'slotCapacityBytes');
 const requested=positive(config.maxBytes??policy.hardLimitBytes,'maxBytes');
 const limitBytes=Math.min(policy.hardLimitBytes,slot,requested);
 return {standard:animationStandard.id,format,hardLimitBytes:policy.hardLimitBytes,slotCapacityBytes:slot,limitBytes,
  coreTargetBytes:{min:Math.floor(limitBytes*animationStandard.coreTarget.minFraction),max:Math.floor(limitBytes*animationStandard.coreTarget.maxFraction)},
  warningAboveBytes:policy.warningAboveBytes??null};
}
export function packSizeReport(format,bytes,config={}){
 const budget=packBudget(format,config);
 if(!Number.isSafeInteger(bytes)||bytes<0)throw Error('INVALID_PACK_SIZE');
 if(bytes>budget.limitBytes)throw Error('PACK_SIZE_LIMIT:'+bytes+'>'+budget.limitBytes);
 const warnings=budget.warningAboveBytes!==null&&bytes>budget.warningAboveBytes?
  ['H3 pack exceeds 10 MB: '+bytes.toLocaleString('en-US')+' bytes; '+(budget.limitBytes-bytes).toLocaleString('en-US')+' bytes remain. Account for this headroom before adding more animations.']:[];
 return {...budget,bytes,remainingBytes:budget.limitBytes-bytes,usedPercent:Math.round(bytes/budget.limitBytes*10000)/100,warnings};
}
