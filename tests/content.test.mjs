import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {profile,projects,experience,education,documents,honors,leadership,skills,legacyHashes} from '../site/content.mjs';
import {escapeHTML,renderPages} from '../site/pages.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=resolve(root,'dist');
const media=JSON.parse(await readFile(resolve(root,'.generated/media.json'),'utf8'));
const baseline=JSON.parse(await readFile(resolve(root,'site/baseline.json'),'utf8'));
const pages=renderPages(media);
const fileFor=p=>resolve(dist,p==='/404.html'?'404.html':p.slice(1)+'index.html');
const htmlFor=p=>readFile(fileFor(p),'utf8');
const exists=async p=>assert.ok((await stat(p)).isFile(),p);
const sha=b=>createHash('sha256').update(b).digest('hex');

test('14 real HTML documents with one H1, canonical metadata, and core content',async()=>{
 assert.equal(pages.length,14);
 for(const page of pages){const html=await htmlFor(page.path);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,page.path);assert.ok(html.includes('id="main"'));assert.ok(html.includes(profile.origin+page.path));assert.ok(html.includes('og:image'));assert.ok(html.includes('application/ld+json'));assert.ok(html.length>1000);const json=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];assert.equal(JSON.parse(json)['@type'],'Person');}
});
test('HTML escaping rejects markup in content fields',()=>assert.equal(escapeHTML('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;'));
test('all five projects and four roles remain represented',async()=>{
 const work=await htmlFor('/work/');assert.equal(projects.length,5);assert.equal(experience.length,4);
 for(const p of projects){assert.ok(work.includes(escapeHTML(p.title)));assert.ok(work.includes(escapeHTML(p.description)));await exists(fileFor('/work/'+p.slug+'/'));}
 for(const job of experience)for(const text of [job.role,job.company,job.duration,job.summary,...job.bullets])assert.ok(work.includes(escapeHTML(text)),text);
});
test('education, honors, leadership and all sixteen skills are preserved',async()=>{
 const about=await htmlFor('/about/');assert.equal(skills.length,16);
 for(const item of education)for(const text of Object.values(item))assert.ok(about.includes(escapeHTML(text)),text);
 for(const text of [...honors,...leadership,...skills])assert.ok(about.includes(escapeHTML(text)),text);
});
test('18 original PDFs remain byte-for-byte unchanged with stable paths',async()=>{
 const archive=await htmlFor('/archive/');assert.equal(baseline.documents.length,18);
 for(const name of baseline.documents){const a=await readFile(resolve(root,'public/documents',name));const b=await readFile(resolve(dist,'documents',name));assert.equal(sha(a),sha(b));assert.ok(archive.includes('/documents/'+name));}
 for(const group of documents)for(const item of group.items)assert.ok(archive.includes(escapeHTML(item.label)));
});
test('every original photo is preserved in source and has a browser-compatible rendition',async()=>{
 for(const name of baseline.photos){const image=media.photos.find(p=>p.name===name);assert.ok(image,name);assert.ok(image.width>0&&image.height>0);assert.ok(image.alt);assert.ok(image.src.endsWith('.webp'));await exists(resolve(dist,decodeURIComponent(image.src.slice(1))));const original=await readFile(resolve(root,image.source));assert.equal(image.sha256,sha(original));assert.equal(image.original,image.source);}
 assert.equal(media.photos.length,baseline.photos.length);
});
test('all original tracks remain byte-for-byte unchanged; one player per music page',async()=>{
 for(const name of baseline.tracks){const track=media.tracks.find(t=>t.name===name);assert.ok(track,name);assert.equal(sha(await readFile(resolve(root,'src/content/music',name))),sha(await readFile(resolve(dist,decodeURIComponent(track.src.slice(1))))));}
 for(const path of ['/','/life/']){const html=await htmlFor(path);assert.equal((html.match(/<audio /g)||[]).length,1);assert.ok(html.includes('preload="none"'));assert.ok(!html.includes('autoplay'));}
});
test('all internal links, fragments, images, scripts and styles resolve',async()=>{
 for(const page of pages){const html=await htmlFor(page.path);for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const raw=match[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|data:)/.test(raw))continue;
  const url=new URL(raw,'https://local.test'+page.path);const path=decodeURIComponent(url.pathname);let target=resolve(dist,'.'+path);const info=await stat(target);if(info.isDirectory())target=resolve(target,'index.html');await exists(target);
  if(url.hash&&target.endsWith('.html')){const text=await readFile(target,'utf8');assert.ok(text.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),page.path+' -> '+raw);}
 }}
});
test('legacy section hashes have usable static fallback destinations',async()=>{
 const home=await htmlFor('/');for(const [id,target] of Object.entries(legacyHashes)){assert.ok(home.includes(`id="${id}"`));assert.ok(home.includes(`href="${target}"`));}
});
test('asset hashes, social preview, sitemap, CSP, and genuine 404 exist',async()=>{
 const home=await htmlFor('/');assert.match(home,/styles\.[a-f0-9]{12}\.css/);assert.match(home,/client\.[a-f0-9]{12}\.js/);
 await exists(resolve(dist,'media/social-preview.png'));const map=await readFile(resolve(dist,'sitemap.xml'),'utf8');assert.equal((map.match(/<url>/g)||[]).length,13);const headers=await readFile(resolve(dist,'_headers'),'utf8');assert.ok(headers.includes("script-src 'self' 'sha256-"));assert.ok((await htmlFor('/404.html')).includes('noindex,follow'));
});
test('ordinary builds have no browser API or third-party rendering dependency',async()=>{
 const home=await htmlFor('/');assert.ok(!home.includes('api.github.com'));assert.ok(!home.includes('fonts.googleapis'));assert.ok(!home.includes('VITE_'));
 const pack=JSON.parse(await readFile(resolve(root,'package.json'),'utf8'));assert.equal(Object.keys(pack.dependencies||{}).length,0);
});
