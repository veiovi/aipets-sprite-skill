import {animationStandard} from './pack-budget.mjs';
export const poseNames=animationStandard.spriteSpeaking.poseIds;
export function defaultGestures(){
 const step=(pose,durationMs)=>({pose,durationMs});
 const pair=(id,kind,automatic)=>({id,kind,automatic,path:[step('upright',132),step(id+'-half',330),step(id,660),step(id+'-half',330),step('upright',264)]});
 return [pair('left','look-left',true),pair('right','look-right',true),
  {id:'up',kind:'look-up',automatic:true,path:[step('upright',132),step('up',594),step('upright',264)]},
  {id:'blink',kind:'blink',automatic:true,path:[step('upright',66),step('blink-half',66),step('blink',99),step('blink-half',66),step('upright',132)]},
  pair('nod','nod',false),pair('tilt','tilt',false),pair('lean','lean',false)];
}
export function validateRichSpeaking(speaking,stageCount){
 if(speaking.variants?.length)throw Error('Migrate speaking.variants to speaking.poses with reviewed gesture paths; the old scheduler is retired.');
 if(!speaking.poses?.length)throw Error('RICH_SPEAKING_REQUIRED: provide all 14 pose banks including upright');
 const ids=speaking.poses.map(p=>p.id);
 if(ids.some(id=>!/^[-a-z0-9]+$/.test(id)||['neutral','upright'].includes(id))||new Set(ids).size!==ids.length)throw Error('Unique pose IDs required; upright is the default speech bank');
 for(const id of poseNames)if(!ids.includes(id))throw Error('Missing pose '+id);
 for(const p of speaking.poses)if(p.cells?.length!==stageCount)throw Error('Every pose must have every mouth stage');
 const gestures=speaking.gestures??defaultGestures();
 for(const g of gestures){if(g.path[0]?.pose!=='upright'||g.path.at(-1)?.pose!=='upright')throw Error('Gesture must enter and return through upright');for(const s of g.path)if(s.pose!=='upright'&&!ids.includes(s.pose))throw Error('Missing pose '+s.pose);}
 for(const required of animationStandard.spriteSpeaking.gestures){
  const matching=gestures.filter(g=>g.kind===required.kind);
  if(!matching.some(g=>g.path.some(s=>s.pose===required.pose)&&(!required.automatic||g.automatic===true)))throw Error('RICH_SPEAKING_GESTURE_REQUIRED:'+required.kind);
 }
 return gestures;
}
export function speakingPoses(speaking,get,stageCount){
 const gestures=validateRichSpeaking(speaking,stageCount);
 const poses=speaking.poses.map(p=>({id:p.id,frames:p.cells.map(i=>get(p.sheet,i))}));
 return {poses,gestures,breakMs:speaking.breakMs??{minMs:2000,maxMs:5000}};
}
