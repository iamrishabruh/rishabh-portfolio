import {readdir,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {profile,projects,experience,education,documents,skills} from '../site/content.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const dir of ['site','scripts','tests'])for(const name of await readdir(root+dir))if(/\.(mjs|js)$/.test(name))execFileSync(process.execPath,['--check',root+dir+'/'+name],{stdio:'inherit'});
for(const data of [projects,experience,education,skills])assert.ok(data.length>0,'Content collections must not be empty');
assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length,'Project slugs must be unique');
for(const p of projects)assert.match(p.slug,/^[a-z0-9-]+$/);
for(const url of [profile.github,profile.linkedin,profile.reachmind,...projects.map(p=>p.repo)])assert.equal(new URL(url).protocol,'https:');
for(const group of documents)for(const doc of group.items){assert.ok(doc.label);if(doc.path)assert.match(doc.path,/^\/documents\/[\w-]+\.pdf$/);}
const client=await readFile(root+'site/client.js','utf8');
assert.ok(!/VITE_GITHUB_TOKEN|REACT_APP_GITHUB_TOKEN|innerHTML|document\.write|eval\(/.test(client),'No client credential paths or HTML injection sinks');
console.log('JavaScript syntax and content guards passed. This is not an ESLint or dependency-security audit.');
