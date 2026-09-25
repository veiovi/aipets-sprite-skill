import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export function verifySpeaking(api,bytes,wasm){
 const pack=api.parseFramePack(bytes),seen=new Set(),offsets=new Set();let ticks=0;
 if(pack.speakingPoses){assert.deepEqual(pack.speakingPoses.frames[0],pack.talk.stageFrames);for(const row of pack.speakingPoses.frames)assert.equal(row.length,pack.talk.stageFrames.length);}
 for(const profile of [0,1,2])for(const drift of [false,true]){
  const ts=new api.FramePlayer(pack,42),c=api.WasmFramePlayer.create(wasm,bytes,42);
  for(const p of [ts,c]){p.setAnimationProfile(profile);p.setSpeakingDrift(drift);}
  for(let tick=0;tick<2400;tick++){
   const state=tick<1900?6:tick<2020?4:tick<2140?5:tick<2260?3:6;
   const level=tick>=1700&&tick<1900?0:15+tick*13%86;
   for(const p of [ts,c]){p.setSysState(state);p.setAudioLevel(level);if(tick===800)p.notifyTouch();p.tick();}
   assert.deepEqual([c.frameCrc32(),c.debugSpeakingPose(),c.debugOffsetX(),c.debugOffsetY()],[ts.frameCrc32(),ts.debugSpeakingPose(),ts.debugOffsetX(),ts.debugOffsetY()],'C/WASM parity');
   assert.ok(Math.abs(c.debugOffsetX())<=2&&Math.abs(c.debugOffsetY())<=2);
   if(profile===2||tick>1750&&tick<1900)assert.equal(c.debugSpeakingPose(),0,'Reduced motion / silence returns neutral');
   if(state===6){seen.add(c.debugSpeakingPose());offsets.add(c.debugOffsetX()+','+c.debugOffsetY());}
   ticks++;
  }
 }
 if(pack.speakingPoses)for(const g of pack.speakingPoses.gestures.filter(g=>g.automatic))for(const s of g.steps)assert.ok(seen.has(s.pose),'Automatic pose was not exercised');
 const sha=b=>createHash('sha256').update(b).digest('hex');
 return {packSha256:sha(bytes),wasmSha256:sha(wasm),parityTicks:ticks,profiles:[0,1,2],drift:[false,true],speechInput:'deterministic amplitude sweep; live audio can be reviewed in preview',silence:true,touch:true,stateChanges:true,reducedMotion:true,observedPoses:[...seen],observedOffsets:[...offsets]};
}
