/** Local production-output server: real 404s, audio ranges, and Netlify CSP. */
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist',import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg','.m4a':'audio/mp4','.ogg':'audio/ogg','.wav':'audio/wav','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const headers=await readFile(resolve(root,'_headers'),'utf8');
const csp=headers.match(/Content-Security-Policy: (.*)/)?.[1];
createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  let file=resolve(root,'.'+pathname);if(!file.startsWith(root+sep)&&file!==root){res.writeHead(403);res.end();return;}
  let code=200;
  try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');await stat(file);}catch{file=resolve(root,'404.html');code=404;}
  const bytes=await readFile(file);const type=types[extname(file).toLowerCase()]||'application/octet-stream';
  const responseHeaders={'Content-Type':type,'X-Content-Type-Options':'nosniff','Content-Security-Policy':csp,'Referrer-Policy':'strict-origin-when-cross-origin','Accept-Ranges':'bytes'};
  const range=req.headers.range;
  if(range&&code===200){
   const match=/^bytes=(\d*)-(\d*)$/.exec(range);
   let start=match?.[1]?Number(match[1]):0;let end=match?.[2]?Number(match[2]):bytes.length-1;
   if(match&&!match[1]&&match[2]){start=Math.max(0,bytes.length-Number(match[2]));end=bytes.length-1;}
   if(!match||(!match[1]&&!match[2])||start>end||start>=bytes.length||start<0){res.writeHead(416,{'Content-Range':`bytes */${bytes.length}`});res.end();return;}
   end=Math.min(end,bytes.length-1);const part=bytes.subarray(start,end+1);
   res.writeHead(206,{...responseHeaders,'Content-Range':`bytes ${start}-${end}/${bytes.length}`,'Content-Length':part.length});res.end(req.method==='HEAD'?undefined:part);return;
  }
  res.writeHead(code,{...responseHeaders,'Content-Length':bytes.length});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(error){console.error(error.message);if(!res.headersSent)res.writeHead(500);res.end('Unable to serve this file.');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://127.0.0.1:${port}`));
