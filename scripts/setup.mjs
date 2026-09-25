#!/usr/bin/env node
import {readFileSync,mkdirSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const here=dirname(fileURLToPath(import.meta.url));
if(Number(process.versions.node.split('.')[0])<22)throw Error('Node.js 22 or newer is required');
const pin=JSON.parse(readFileSync(join(here,'compiler-pin.json'),'utf8'));
const archive=join(here,'compiler.tgz'),bytes=readFileSync(archive);
if(createHash('sha256').update(bytes).digest('hex')!==pin.sha256)throw Error('Bundled compiler hash mismatch');
const runtime=join(here,'runtime');mkdirSync(runtime,{recursive:true});
for(const name of ['package.json','package-lock.json'])copyFileSync(join(here,'runtime-lock',name),join(runtime,name));
copyFileSync(archive,join(runtime,'compiler.tgz'));
const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['ci','--ignore-scripts','--no-audit','--no-fund'],{cwd:runtime,stdio:'inherit',shell:process.platform==='win32'});
if(result.status!==0)throw Error('Compiler dependency installation failed');
writeFileSync(join(runtime,'installed.json'),JSON.stringify(pin,null,2));
console.log('Verified compiler installed locally. Image generation uses the built-in Codex tool.');
