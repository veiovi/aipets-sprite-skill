import {test} from 'node:test';
import assert from 'node:assert/strict';
import {speakingPoses,poseNames,defaultGestures} from './speaking-poses.mjs';
const get=(sheet,index)=>({sha256:sheet+index});
test('14-pose inventory has independent stages, seven gestures and brief both-eye blink',()=>{
 const speaking={poses:poseNames.map(id=>({id,sheet:id,cells:[0,1,2,3,4,5,6]}))};
 const result=speakingPoses(speaking,get,7);
 assert.equal(result.poses.length,13);assert.equal(result.gestures.length,7);
 assert.deepEqual(result.gestures.filter(g=>g.automatic).map(g=>g.id),['left','right','up','blink']);
 assert.deepEqual(result.gestures[3].path.slice(1,4).map(s=>s.durationMs),[66,99,66]);
 assert.deepEqual(result.breakMs,{minMs:2000,maxMs:5000});
 assert.throws(()=>speakingPoses(speaking,get,8),/every mouth stage/);
 assert.throws(()=>speakingPoses({poses:speaking.poses.slice(1)},get,7),/Missing pose/);
 assert.throws(()=>speakingPoses({variants:[{}]},get,7),/Migrate/);
 assert.throws(()=>speakingPoses({},get,7),/RICH_SPEAKING_REQUIRED/);
 for(const omitted of defaultGestures()){
  assert.throws(()=>speakingPoses({...speaking,gestures:defaultGestures().filter(g=>g.kind!==omitted.kind)},get,7),/RICH_SPEAKING_GESTURE_REQUIRED/);
 }
 const disabled=defaultGestures();disabled[0].automatic=false;
 assert.throws(()=>speakingPoses({...speaking,gestures:disabled},get,7),/RICH_SPEAKING_GESTURE_REQUIRED:look-left/);
 const fake=defaultGestures();fake[0].path=[{pose:'upright',durationMs:132},{pose:'upright',durationMs:132}];
 assert.throws(()=>speakingPoses({...speaking,gestures:fake},get,7),/RICH_SPEAKING_GESTURE_REQUIRED:look-left/);
});
