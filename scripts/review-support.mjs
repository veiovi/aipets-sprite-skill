import {animationStandard} from './pack-budget.mjs';
export function motionSegments(motion) {
 const segments=motion.segments??[{...motion,label:motion.id}];
 if(motion.segments&&(motion.role!=='foundation/idle-breathing'||motion.mode!=='loop'||motion.cells||motion.sheet))throw Error('Idle segments require one looping idle role without top-level sheet/cells');
 const ids=segments.map(s=>s.id);
 if(ids.some(id=>!/^[-a-z0-9]+$/.test(id))||new Set(ids).size!==ids.length)throw Error('Unique safe segment IDs required');
 return segments.map(s=>{
  if(!Array.isArray(s.cells)||!s.cells.length)throw Error('Segment needs selected cells');
  let steps=s.cells.map((index,i)=>({sheet:s.sheet,index,durationMs:s.durations?.[i]??s.durationMs??165}));
  const mode=motion.segments?s.mode:motion.mode;
  if(motion.segments&&!['once','loop','ping-pong'].includes(mode))throw Error('Invalid segment mode');
  if(mode==='ping-pong'&&steps.length>2)steps=[...steps,...steps.slice(1,-1).reverse()];
  return {id:s.id,label:s.label??s.id,steps};
 });
}

export function reviewScenes(config) {
 const duration=role=>{
  const m=config.motions.find(m=>m.role===role);if(!m)return 2000;
  const ms=motionSegments(m).flatMap(s=>s.steps).reduce((a,b)=>a+b.durationMs,0);
  return Math.max(2000,ms+(m.neutralEnds?264:0)+330);
 };
 const idle=config.motions.find(m=>m.role==='foundation/idle-breathing');
 let offsetMs=0;
 const variants=idle?.segments?motionSegments(idle).map(s=>{
  const ms=s.steps.reduce((a,b)=>a+b.durationMs,0),scene={id:'idle-'+s.id,label:s.label,state:3,durationMs:ms,seekTicks:Math.round(offsetMs/33),repeat:true};offsetMs+=ms;return scene;
 }):[];
 return [
  {id:'idle',label:variants.length?'Idle mix · all moods':'Idle + blink',state:3,durationMs:duration('foundation/idle-breathing')},
  ...variants,
  {id:'listening',label:'Listening',state:4,durationMs:duration('states/listening')},
  {id:'thinking',label:'Thinking',state:5,durationMs:duration('states/thinking')},
  {id:'touch',label:'Touch reaction',state:3,touch:true,durationMs:duration('physical/touch-tap')+660},
  {id:'speaking',label:'Speaking + silence',state:6,speech:true,durationMs:6336},
  {id:'speech-touch',label:'Touch while speaking',state:6,speech:true,touch:true,durationMs:6336},
  ...((config.speaking?.poses??[]).length?[{id:'speaking-poses',label:'Speaking · random poses with 2–5-second breaks',state:6,speech:true,durationMs:33000}]:[]),
  ...[['booting','Booting',0],['provisioning','Provisioning',1],['connecting','Connecting',2],['offline','Offline',7],['error','Error',8]].map(([id,label,state])=>({id,label,state,durationMs:duration('states/'+id)}))
 ];
}

export function reviewMetadata(config, summary, events, elapsedMs) {
 return {name:config.name,scenes:reviewScenes(config),summary:summary??null,
  events:[...events,{stage:'build',status:'preview rendered',durationMs:elapsedMs,note:'Elapsed through preview generation; final command duration is in run-events.jsonl.'}],
  inventory:{standard:animationStandard.id,speechStages:config.speaking.cells.length+1,speakingPoses:1+(config.speaking.poses?.length??0),motions:config.motions.length,idleVariants:config.motions.find(m=>m.role==='foundation/idle-breathing')?.segments?.length??1,personalityMoments:(config.motions.find(m=>m.role==='foundation/idle-breathing')?.segments??[]).map(s=>s.moment??s.id).filter(id=>animationStandard.personalityMoments.includes(id)),effects:config.effects.length}};
}
