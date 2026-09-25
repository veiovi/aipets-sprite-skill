#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,existsSync,copyFileSync,renameSync,appendFileSync} from 'node:fs';
import {reviewMetadata,motionSegments} from './review-support.mjs';
import {speakingPoses,validateRichSpeaking} from './speaking-poses.mjs';
import {validateFullInventory} from './full-inventory.mjs';
import {packBudget,packSizeReport} from './pack-budget.mjs';
import {verifySpeaking} from './verify-speaking.mjs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const startedAt=new Date().toISOString(),started=performance.now();
const here=dirname(fileURLToPath(import.meta.url));
const runtime=process.env.AIPET_SPRITE_RUNTIME||join(here,'runtime');
const require=createRequire(join(runtime,'package.json'));
const api=await import(require.resolve('@aipet/frame-pack'));
const {readSprite,projectCell,prepareSheet,repairSpeech,contactSheet,pngBytes,compileCloudFullFramePack}=api;
const sha=b=>createHash('sha256').update(b).digest('hex');
const json=p=>JSON.parse(readFileSync(p,'utf8'));
const compilerEntry=require.resolve('@aipet/frame-pack');
const processorHash=sha(readFileSync(join(dirname(compilerEntry),'sprite-authoring.js')));
const development=!!process.env.AIPET_SPRITE_RUNTIME;
if(!development){
 const pin=json(join(here,'compiler-pin.json')),installed=json(join(runtime,'installed.json'));
 if(JSON.stringify(pin)!==JSON.stringify(installed)||sha(readFileSync(join(here,'compiler.tgz')))!==pin.sha256)throw Error('Runtime pin changed: run setup.mjs again');
 for(const [file,hash] of Object.entries(pin.runtimeFiles))if(sha(readFileSync(join(dirname(compilerEntry),file)))!==hash)throw Error(`Installed compiler changed: ${file}`);
}
const save=(p,v)=>{mkdirSync(dirname(p),{recursive:true});writeFileSync(p+'.next',JSON.stringify(v,null,2)+'\n');renameSync(p+'.next',p);};
const write=(p,b)=>{mkdirSync(dirname(p),{recursive:true});writeFileSync(p,b);};
const selectionDigest=r=>sha(JSON.stringify({inputHash:r.inputHash,processorHash:r.processorHash,neutralSha256:r.neutralSha256,frames:r.sheets.map(s=>({id:s.id,hashes:s.frameHashes}))}));
const [command,projectArg,...args]=process.argv.slice(2);
if(!command||!projectArg)throw Error('Usage: workflow.mjs scaffold|prepare|build|deliver PROJECT_DIRECTORY [columns rows]');
const root=resolve(projectArg),config=json(join(root,'sprite-project.json'));
const capacity=packBudget('sprite',config);
if(command==='build'||command==='deliver'){validateFullInventory(config);validateRichSpeaking(config.speaking,config.speaking.cells.length+1);}
const eventPath=join(root,'run-events.jsonl');
process.on('exit',code=>appendFileSync(eventPath,JSON.stringify({stage:command,startedAt,finishedAt:new Date().toISOString(),durationMs:Math.round(performance.now()-started),status:code===0?'passed':'failed',tokens:null})+'\n'));
const out=join(root,'prepared');
const loadImage=file=>readSprite(readFileSync(resolve(root,file)));
const neutralSource=loadImage(config.neutral);
const neutral=projectCell(neutralSource,{x:0,y:0,width:neutralSource.width,height:neutralSource.height},config.matte??[16,28,40]);
if(command==='scaffold'){
 const columns=Number(args[0]??4),rows=Number(args[1]??3);
 if(!Number.isInteger(columns)||!Number.isInteger(rows)||columns<1||rows<1||columns>8||rows>8)throw Error('Grid must be 1–8 rows/columns');
 write(join(root,`scaffold-${columns}x${rows}.png`),pngBytes(contactSheet(Array(columns*rows).fill(neutral),columns)));
 console.log('Scaffold ready. Inspect before passing it to ImageGen.');
}else if(command==='prepare'){
 const sourceFiles=[config.neutral,...config.sheets.map(s=>s.file)];
 const sourceHashes=Object.fromEntries(sourceFiles.map(f=>[f,sha(readFileSync(resolve(root,f)))]));
 const inputHash=sha(JSON.stringify({config,sourceHashes}));
 const approval=config.lookApproval;
 if(!approval||approval.sourceSha256!==sourceHashes[config.neutral]||!['human','autonomous-demo'].includes(approval.mode)||!approval.note)throw Error('Lock this exact look first; only an explicitly authorized demo may choose its own identity');
 const ids=config.sheets.map(s=>s.id);
 if(new Set(ids).size!==ids.length||ids.some(id=>id==='neutral'||!/^[-a-z0-9]+$/.test(id)))throw Error('Unique safe sheet IDs required; neutral is reserved');
 const reports=[];
 write(join(out,'neutral.png'),pngBytes(neutral));
 for(const sheet of config.sheets){
  const prepared=prepareSheet(loadImage(sheet.file),{...sheet.recipe,matte:config.matte??[16,28,40]},sheet.reference==='neutral'?neutral:undefined);
  prepared.frames.forEach((frame,i)=>write(join(out,sheet.id,`${i}.png`),pngBytes(frame)));
  write(join(out,sheet.id,'raw-contact.png'),pngBytes(contactSheet(prepared.originals)));
  write(join(out,sheet.id,'contact.png'),pngBytes(contactSheet(prepared.frames)));
  reports.push({id:sheet.id,source:sheet.file,sourceSha256:sourceHashes[sheet.file],frames:prepared.frames.length,frameHashes:prepared.frames.map(f=>sha(pngBytes(f))),diagnostics:prepared.diagnostics});
 }
 const neutralSha256=sha(pngBytes(neutral));
 const selectionHash=sha(JSON.stringify({inputHash,processorHash,neutralSha256,frames:reports.map(s=>({id:s.id,hashes:s.frameHashes}))}));
 const report={version:1,inputHash,selectionHash,processorHash,sourceHashes,neutralSha256,sheets:reports};
 save(join(out,'report.json'),report);
 console.log(JSON.stringify(report,null,2));
}else if(command==='build'){
 const report=json(join(out,'report.json'));
 if(selectionDigest(report)!==report.selectionHash)throw Error('Prepared report changed: prepare and review again');
 const current=Object.fromEntries(Object.keys(report.sourceHashes).map(f=>[f,sha(readFileSync(resolve(root,f)))]));
 if(sha(JSON.stringify({config,sourceHashes:current}))!==report.inputHash||report.processorHash!==processorHash)throw Error('Source/recipe/processor changed: prepare and review again');
 const reviewPath=join(root,'source-review.json');
 const review=existsSync(reviewPath)?json(reviewPath):null;
 if(review){
  if(review.selectionHash!==report.selectionHash||!['human','autonomous'].includes(review.mode)||review.verdict!=='pass')throw Error('Source review is stale or not passed');
  for(const sheet of report.sheets){const r=review.sheets?.find(r=>r.id===sheet.id);if(!r||r.verdict!=='pass'||!r.notes||r.inspectedFrames?.length!==sheet.frames||new Set(r.inspectedFrames).size!==sheet.frames||r.inspectedFrames.some(n=>!Number.isInteger(n)||n<0||n>=sheet.frames))throw Error(`Inspect every raw and corrected frame of ${sheet.id}`);}
  for(const key of ['identity','speechOrder','naturalMotion','loopSeams','circularCrop','effectComposites'])if(!review.checks?.[key])throw Error(`Missing visual review: ${key}`);
 }
 const artifacts=new Map();
 const add=bytes=>{const sha256=sha(bytes);artifacts.set(sha256,bytes);return{sha256};};
 const n=add(readFileSync(join(out,'neutral.png')));
 if(n.sha256!==report.neutralSha256)throw Error('Prepared neutral changed');
 const get=(sheet,index)=>{
  if(sheet==='neutral')return n;
  const r=report.sheets.find(s=>s.id===sheet);
  if(!r||!Number.isInteger(index)||index<0||index>=r.frames)throw Error(`Invalid selected frame ${sheet}:${index}`);
  const bytes=readFileSync(join(out,sheet,`${index}.png`));
  if(sha(bytes)!==r.frameHashes[index])throw Error(`Prepared frame changed: ${sheet}:${index}`);
  return add(bytes);
 };
 const stages=[n,...config.speaking.cells.map(index=>get(config.speaking.sheet,index))];
 if(config.speaking.repairRegion){
  for(let i=1;i<stages.length;i++)stages[i]=add(pngBytes(repairSpeech(neutral,readSprite(Buffer.from(artifacts.get(stages[i].sha256))),config.speaking.repairRegion)));
 }
 if(new Set(stages.map(s=>s.sha256)).size!==stages.length)throw Error('Duplicate speaking stages; choose distinct amplitude openings');
 write(join(out,'speech-contact.png'),pngBytes(contactSheet(stages.map(s=>readSprite(Buffer.from(artifacts.get(s.sha256)))))));
 const composites=[];
 for(const effect of config.effects)for(const index of effect.cells){
  const fx=readSprite(Buffer.from(artifacts.get(get(effect.sheet,index).sha256)));
  for(const background of ['dark','light','checker','pet']){
   const canvas=readSprite(pngBytes(neutral));
   for(let y=0;y<240;y++)for(let x=0;x<240;x++){const i=(y*240+x)*4;
    if(background!=='pet'){const v=background==='dark'?24:background==='light'?238:(Math.floor(x/12)+Math.floor(y/12))%2?110:190;canvas.data.set([v,v,v,255],i);}
    if(fx.data[i+3])canvas.data.set(fx.data.subarray(i,i+4),i);
   }composites.push(canvas);
  }
 }
 const steps=c=>c.cells.map((index,i)=>({image:get(c.sheet,index),durationMs:c.durations?.[i]??c.durationMs??165}));
 for(const effect of config.effects)if(new Set(effect.cells.map(i=>get(effect.sheet,i).sha256)).size<3)throw Error(`Effect ${effect.id} needs at least three distinct animated sprite frames`);
 const input={version:4,presentation:'full-frame',resolution:240,id:config.id,name:config.name,packVersion:config.version??'1.0.0',sourceHash:n.sha256,approvalHash:review?sha(JSON.stringify(review)):null,readiness:review?'approved-source':'candidate',neutral:n,
  talk:{frames:stages,levelBreakpoints:config.speaking.thresholds??stages.map((_,i)=>Math.round(i*100/(stages.length-1))),...speakingPoses(config.speaking,get,stages.length)},
  motions:config.motions.map(m=>({id:m.id,role:m.role,sourceFingerprint:sha(JSON.stringify(m)),mode:m.segments?'loop':m.mode,steps:m.segments?motionSegments(m).flatMap(s=>s.steps).map(s=>({image:get(s.sheet,s.index),durationMs:s.durationMs})):steps(m),enter:m.neutralEnds?[{image:n,durationMs:99}]:[],exit:m.neutralEnds?[{image:n,durationMs:165}]:[]})),
  effects:config.effects.map(e=>({id:e.id,role:e.role,plane:e.plane,sourceFingerprint:sha(JSON.stringify(e)),steps:steps(e),loop:e.loop})),protectedRegions:config.protectedRegions??[],maxBytes:capacity.limitBytes,slotCapacityBytes:capacity.limitBytes};
 const pin=json(join(here,'compiler-pin.json'));
 const options={compilerCommit:pin.commit,compilerVersion:pin.version,compilerPackageSha256:pin.sha256,emitPreviews:true};
 const a=compileCloudFullFramePack(input,artifacts,options),b=compileCloudFullFramePack(input,artifacts,{...options,emitPreviews:false});
 if(a.sha256!==b.sha256||a.evidenceSha256!==b.evidenceSha256)throw Error('Nondeterministic compilation');
 const size=packSizeReport('sprite',a.pack.length,config);
 const buildDir=join(root,'build');
 write(join(buildDir,`${config.id}.aipetframes`),a.pack);
 save(join(buildDir,'compiler-input.json'),input);save(join(buildDir,'evidence.json'),a.evidence);
 write(join(buildDir,'player.wasm'),a.wasm);
 write(join(buildDir,'speech-contact.png'),readFileSync(join(out,'speech-contact.png')));
 if(composites.length)write(join(buildDir,'effect-composites.png'),pngBytes(contactSheet(composites)));
 // Static offline document runs the exact bundled C/WASM player, not an imitation.
 const template=readFileSync(join(here,'preview.html'),'utf8');
 const summaryPath=join(root,'run-summary.json');
 const events=existsSync(eventPath)?readFileSync(eventPath,'utf8').trim().split('\n').filter(Boolean).map(line=>JSON.parse(line)):[];
 const metadata=reviewMetadata(config,existsSync(summaryPath)?json(summaryPath):null,events,Math.round(performance.now()-started));
 metadata.size=size;
 const parsed=api.parseFramePack(a.pack),poseContacts=[];
 for(const [row,ids] of (parsed.speakingPoses?.frames??[parsed.talk.stageFrames]).entries()){
  const frames=ids.map(id=>{const image=readSprite(pngBytes(neutral)),indexes=parsed.decodeFrame(id);for(let i=0;i<indexes.length;i++){const v=parsed.paletteRgb565[indexes[i]];image.data.set([Math.round((v>>11)*255/31),Math.round(((v>>5)&63)*255/63),Math.round((v&31)*255/31),255],i*4);}return image;});
  const name=`pose-${row}.png`,bytes=pngBytes(contactSheet(frames));write(join(buildDir,name),bytes);poseContacts.push(name);
  metadata.poseContacts??=[];metadata.poseContacts.push({label:row===0?'upright':config.speaking.poses[row-1].id,png:bytes.toString('base64')});
 }
 const runtimeChecks=verifySpeaking(api,a.pack,a.wasm);
 save(join(buildDir,'runtime-checks.json'),runtimeChecks);
 save(join(buildDir,'review-data.json'),metadata);
 const html=template.replace('__PACK__',Buffer.from(a.pack).toString('base64')).replace('__WASM__',Buffer.from(a.wasm).toString('base64')).replace('__REVIEW__',Buffer.from(JSON.stringify(metadata)).toString('base64'));
 write(join(buildDir,'preview.html'),html);
 for(let start=0;start<a.previews.length;start+=48)write(join(buildDir,`trace-${start}.png`),pngBytes(contactSheet(a.previews.slice(start,start+48).map(p=>readSprite(Buffer.from(p.png))),8)));
 const buildFiles=['preview.html','review-data.json','player.wasm','evidence.json','compiler-input.json','runtime-checks.json','speech-contact.png',...poseContacts,...(composites.length?['effect-composites.png']:[]),...Array.from({length:Math.ceil(a.previews.length/48)},(_,i)=>`trace-${i*48}.png`)];
 save(join(buildDir,'build.json'),{selectionHash:report.selectionHash,sourceReviewHash:review?sha(JSON.stringify(review)):null,packSha256:a.sha256,bytes:a.pack.length,size,approvedSource:!!review,development,deterministic:true,files:Object.fromEntries(buildFiles.map(f=>[f,sha(readFileSync(join(buildDir,f)))]))});
 console.log(JSON.stringify({packSha256:a.sha256,bytes:a.pack.length,size,frames:a.evidence.frameCount,parityTicks:a.evidence.trace.length,approvedSource:!!review,preview:join(buildDir,'preview.html')},null,2));
}else if(command==='deliver'){
 const build=json(join(root,'build/build.json')),review=json(join(root,'compiled-review.json'));
 const report=json(join(out,'report.json'));
 if(selectionDigest(report)!==report.selectionHash)throw Error('Prepared report changed');
 const sourceHashes=Object.fromEntries(Object.keys(report.sourceHashes).map(f=>[f,sha(readFileSync(resolve(root,f)))]));
 if(development||build.development)throw Error('Use the verified portable bundle for final delivery');
 if(sha(JSON.stringify({config,sourceHashes}))!==report.inputHash||report.processorHash!==processorHash||build.selectionHash!==report.selectionHash)throw Error('Rebuild changed sources before delivery');
 if(!build.approvedSource||sha(JSON.stringify(json(join(root,'source-review.json'))))!==build.sourceReviewHash||review.packSha256!==build.packSha256||review.verdict!=='pass'||!['human','autonomous'].includes(review.mode))throw Error('Review the exact approved-source build before delivery');
 for(const key of ['allStates','speechSilence','touchDuringSpeech','profiles','loopSeams','circularCrop','effects'])if(!review.checks?.[key])throw Error(`Missing compiled review: ${key}`);
 const pack=readFileSync(join(root,'build',`${config.id}.aipetframes`));
 const size=packSizeReport('sprite',pack.length,config);
 if(build.bytes!==pack.length)throw Error('PACK_SIZE_CHANGED');
 if(sha(pack)!==build.packSha256)throw Error('Pack changed since review');
 if(!build.files?.['preview.html']||!build.files?.['player.wasm'])throw Error('Build lacks exact preview bindings');
 for(const [file,hash] of Object.entries(build.files))if(sha(readFileSync(join(root,'build',file)))!==hash)throw Error(`Build artifact changed: ${file}`);
 const evidence=json(join(root,'build/evidence.json'));
 if(evidence.gates.some(g=>g.verdict==='fail'))throw Error('Failed compiler gates prohibit delivery');
 if(evidence.gates.some(g=>g.verdict==='warn')&&!review.checks.technicalWarnings)throw Error('Inspect and explain compiler warnings before delivery');
 write(join(root,'release',`${config.id}.aipetframes`),pack);
 save(join(root,'release/receipt.json'),{...build,size,review,format:'AIPFRAME',resolution:240,requires:'Compatible 240px frame_player firmware with schema-v5 full-frame action/timing support and sufficient asset partition. This file is an asset pack, not an ESP32 firmware image.',slotCapacityBytes:capacity.limitBytes,physicalVerification:'not performed',signedCloudRelease:false});
 copyFileSync(join(root,'build/preview.html'),join(root,'release/preview.html'));
 copyFileSync(join(root,'build/review-data.json'),join(root,'release/review-data.json'));
 for(const file of buildFilesForRelease(build))copyFileSync(join(root,'build',file),join(root,'release',file));
 copyFileSync(join(here,'compiler-pin.json'),join(root,'release/compiler-provenance.json'));
 console.log(`Delivered ${join(root,'release',`${config.id}.aipetframes`)} (${pack.length} bytes)`);
}else throw Error(`Unknown command ${command}`);
function buildFilesForRelease(build){return Object.keys(build.files).filter(f=>!['preview.html','review-data.json'].includes(f));}
