import {readFile,writeFile,mkdir,rm,cp} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPages,renderDocument} from '../site/pages.mjs';
import {profile,documents} from '../site/content.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=join(root,'dist');
execFileSync(process.env.PYTHON||'python3',[join(root,'scripts/media.py')],{cwd:root,stdio:'inherit'});
const media=JSON.parse(await readFile(join(root,'.generated/media.json'),'utf8'));
for(const group of documents)for(const document of group.items)if(document.path&&!media.documents[document.path])throw Error('Missing document: '+document.path);
await rm(out,{recursive:true,force:true});await mkdir(join(out,'assets'),{recursive:true});
await cp(join(root,'public'),out,{recursive:true});
await cp(join(root,'.generated/public'),out,{recursive:true});
const assets={};
for(const [key,file] of [['css','styles.css'],['js','client.js']]){
 const text=await readFile(join(root,'site',file),'utf8');
 const hash=createHash('sha256').update(text).digest('hex').slice(0,12);
 const name=`${file.split('.')[0]}.${hash}.${file.split('.').pop()}`;
 await writeFile(join(out,'assets',name),text);assets[key]='/assets/'+name;
}
const pages=renderPages(media);
const noindex=Boolean(process.env.NETLIFY&&process.env.CONTEXT!=='production');
const structuredHashes=new Set();
for(const page of pages){
 const filename=page.path==='/404.html'?'404.html':page.path.slice(1)+'index.html';
 const target=resolve(out,filename);if(!target.startsWith(out+sep))throw Error('Invalid output route');
 await mkdir(dirname(target),{recursive:true});
 const html=renderDocument(page,{...assets,noindex});
 const structured=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
 if(structured)structuredHashes.add("'sha256-"+createHash('sha256').update(structured).digest('base64')+"'");
 await writeFile(target,html);
}
const canonical=pages.filter(p=>p.path!=='/404.html').map(p=>`  <url><loc>${profile.origin+p.path}</loc></url>`).join('\n');
await writeFile(join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonical}\n</urlset>\n`);
await writeFile(join(out,'robots.txt'),`User-agent: *\n${noindex?'Disallow: /':'Allow: /'}\nSitemap: ${profile.origin}/sitemap.xml\n`);
const csp=`default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; media-src 'self'; style-src 'self'; script-src 'self' ${[...structuredHashes].join(' ')}`;
await writeFile(join(out,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: ${csp}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/photos/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/portrait/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/music/*\n  Cache-Control: public, max-age=0, must-revalidate\n/media/social-preview.png\n  Cache-Control: public, max-age=0, must-revalidate\n`);
await writeFile(join(out,'build-report.json'),JSON.stringify({routes:pages.map(p=>p.path),photos:media.photos.length,tracks:media.tracks.length,documents:Object.keys(media.documents).length,captionReview:media.photos.filter(p=>p.needsDescription).map(p=>p.name),noindex},null,2));
console.log(`Built ${pages.length} static pages. Core content does not require JavaScript.`);
