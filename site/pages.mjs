import {profile,experience,earlierWork,projects,research,education,honors,leadership,skills,documents,repositorySnapshot,legacyHashes} from './content.mjs';
export const escapeHTML = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e = escapeHTML;
const arrow = '<span aria-hidden="true">↗</span>';
const link = (url,text,cls='text-link',external=false) => `<a class="${e(cls)}" href="${e(url)}"${external?' target="_blank" rel="noopener noreferrer"':''}>${e(text)} ${arrow}${external?'<span class="sr-only"> (opens in a new tab)</span>':''}</a>`;
const list = (items,cls='editorial-list') => `<ul class="${cls}">${items.map(item=>`<li>${e(item)}</li>`).join('')}</ul>`;
const kicker = (text) => `<p class="eyebrow">${e(text)}</p>`;
const sectionHead = (num,title,aside='') => `<div class="section-heading"><div>${kicker(num)}<h2>${e(title)}</h2></div>${aside}</div>`;
const pageHero = (section,title,intro) => `<header class="page-hero wrap">${kicker(section)}<h1>${title}</h1><p class="lead reading">${e(intro)}</p></header>`;
function image(photo,{className='',priority=false,sizes='(max-width: 700px) 90vw, 40vw',alt}={}) {
  if(!photo) return '';
  return `<img class="${e(className)}" src="${e(photo.src)}" srcset="${e(photo.srcset)}" sizes="${e(sizes)}" width="${photo.width}" height="${photo.height}" alt="${e(alt??photo.alt)}" loading="${priority?'eager':'lazy'}" decoding="async"${priority?' fetchpriority="high"':''}>`;
}
function nav(path) {
  const items = [['/work/', 'Work'], ['/research/', 'Research'], ['/life/', 'Life'], ['/about/', 'About'], ['/archive/', 'Archive']];
  const navLinks = items.map(([href, label]) => `<a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header"><div class="wrap header-inner">
      <a class="wordmark" href="/" aria-label="Rishabh Chouhan, home">rishabh<span>.</span></a>
      <nav class="desktop-nav" aria-label="Main navigation">${navLinks}</nav>
      <details class="mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">${navLinks}</nav></details>
    </div></header>`;
}

function contact() {
  return `<footer id="contact" class="site-footer"><div class="wrap">
    <div class="contact-main"><h2>Say <em>hello.</em></h2><div class="contact-actions">
      <a class="email-link" href="mailto:${profile.email}">${profile.email} ${arrow}</a>
      <button class="text-link copy-email js-only" type="button" data-email="${profile.email}">Copy email</button>
      <p class="copy-status small" role="status"></p>
    </div></div>
    <div class="footer-bottom"><p class="small">Rishabh Chouhan · Atlanta, GA</p>
      <nav aria-label="Footer navigation">${link(profile.github,'GitHub','footer-link',true)}${link(profile.linkedin,'LinkedIn','footer-link',true)}${link(profile.reachmind,'Reachmind','footer-link',true)}${link('/archive/','Archive','footer-link')}${link('/documents/resume.pdf','Resume','footer-link',true)}</nav>
    </div>
  </div></footer>`;
}

function selectedWork() {
  return `<div class="work-features">
    <a class="work-feature" href="/work/kept/"><span class="work-number" aria-hidden="true">01</span><div><h3>Kept</h3><p class="feature-role">Chief Engineering Officer</p></div><p class="feature-summary">Preserving what people know<br>and why decisions were made.</p><span class="row-arrow" aria-hidden="true">↗</span></a>
    <a class="work-feature" href="/work/care-access/"><span class="work-number" aria-hidden="true">02</span><div><h3>Care Access</h3><p class="feature-role">AI Solutions Architect</p></div><p class="feature-summary">Connecting data and automating<br>healthcare operations.</p><span class="row-arrow" aria-hidden="true">↗</span></a>
  </div>`;
}

function musicPlayer(media,compact=false) {
  const tracks=compact?media.tracks.slice(0,1):media.tracks;
  if(!tracks.length) return '<p>No audio files are currently available.</p>';
  return `<div class="music-player" data-player>${compact?'':kicker('Listen')}<div class="player-heading"><h3 data-now-playing>${e(tracks[0].title)}</h3>${compact?'':'<span class="small">Songwriting & music</span>'}</div><audio id="audio-player" controls preload="none" src="${e(tracks[0].src)}" aria-label="Music player">${link(tracks[0].src,'Open audio file')}</audio><p class="player-status small" role="status">Press play to listen.</p><button type="button" class="text-link js-only retry-audio" hidden>Retry playback</button>${compact?'':`<ol class="track-list">${tracks.map((track,i)=>`<li><span class="track-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><button type="button" class="track-button js-only" data-track="${e(track.src)}" data-title="${e(track.title)}" aria-label="Play ${e(track.title)}">${e(track.title)} <span aria-hidden="true" class="play-symbol">▷</span></button><span class="no-js-only">${e(track.title)}</span><a href="${e(track.src)}" class="track-download" aria-label="Open audio file: ${e(track.title)}" download>Audio ${arrow}</a></li>`).join('')}</ol>`}${compact?link('/life/#music','All seven songs'):''}</div>`;
}
function photoTile(photo,i) {
  return `<figure class="gallery-item"><a href="${e(photo.full)}" class="photo-link" data-lightbox data-caption="${e(photo.alt)}">${image(photo,{sizes:'(max-width: 560px) 92vw, (max-width: 900px) 45vw, 30vw'})}<span class="photo-enlarge" aria-hidden="true">↗</span></a><figcaption><span>${String(i+1).padStart(2,'0')} / ${e(photo.caption||'From the camera roll')}</span><a href="${e(photo.full)}" class="small" aria-label="Full image for photograph ${i+1}">Full image ${arrow}</a></figcaption></figure>`;
}
function home(media) {
  const photos = media.photos.filter(p => p.name.toLowerCase().endsWith('.jpg')).slice(0,3);
  return `<section class="hero wrap" id="top">
    <div class="hero-copy">${kicker('AI systems · Research · Music')}<h1>Rishabh<br><em>Chouhan.</em></h1>
      <p class="hero-statement">${e(profile.introduction)}</p><p class="hero-description">${e(profile.description)}</p>
      <div class="hero-actions">${link('/work/','View work','button primary')}${link('#contact','Get in touch','text-link')}</div>
    </div>
    <figure class="hero-portrait">${image(media.portrait,{priority:true,sizes:'(max-width: 700px) 42vw, 350px'})}<figcaption><span class="location-dot" aria-hidden="true"></span>Atlanta, Georgia</figcaption></figure>
    <div class="current-strip"><span class="eyebrow">Now</span><a href="/work/kept/">Kept <span>Engineering</span></a><a href="/work/care-access/">Care Access <span>AI & automation</span></a><a href="/research/">Georgia Tech <span>Computer science & research</span></a></div>
  </section>
  <section class="section wrap" id="work">${sectionHead('01','Selected work',link('/work/','All work'))}${selectedWork()}</section>
  <section class="research-home wrap section" id="research"><div class="research-layout">
    <div>${kicker('02 / Research')}<h2>Can more context<br>help a system make<br><em>better decisions?</em></h2></div>
    <div><p class="lead">I’m exploring this in artificial pancreas systems, which use glucose readings to guide insulin delivery.</p><p class="small">${e(research.affiliation)} · ${e(research.status)}</p>${link('/research/','Read about the research')}</div>
  </div></section>
  <section class="section wrap" id="life">${sectionHead('03','Outside work',link('/life/','Photos & music'))}
    <p class="life-intro reading">Singing, songwriting, the gym, football, video games, and traveling.</p>
    <div class="photo-preview">${photos.map(photoTile).join('')}</div>
    <div class="home-music"><div><h3>A little music.</h3><p class="small">Written and recorded along the way.</p></div>${musicPlayer(media,true)}</div>
  </section>
  <section class="section wrap about-home" id="about"><div>${kicker('04 / About')}<h2>Always <em>curious.</em></h2></div><div><p class="lead">${e(profile.personal)}</p><p class="reading">I’m interested in what changes when we understand more of the context—in the systems I build, the questions I research, and the people I learn from.</p>${link('/about/','More about me')}</div></section>
  <nav class="wrap archive-access" aria-label="Portfolio quick links">${Object.entries(legacyHashes).map(([id,url])=>`<a id="${id}" href="${url}">${e({experience:'Experience',projects:'Projects',music:'Music',education:'Education',honors:'Honors & leadership',skills:'Skills',documents:'Documents'}[id])}</a>`).join('')}</nav>${lightbox()}`;
}

function work() {
  return `${pageHero('Portfolio','Work','AI systems, healthcare automation, and experiments in software.')}
    <nav class="wrap section-nav" aria-label="Work sections">${link('#featured','Selected work')}${link('#projects','Projects')}${link('#experience','Experience')}${link('#repositories','Repositories')}</nav>
    <section class="wrap section compact-top" id="featured" aria-label="Selected work">${selectedWork()}</section>
    <section id="projects" class="wrap section">${sectionHead('01','Projects')}
      <div class="project-index">${projects.map((p,i)=>`<a class="project-row" href="/work/${p.slug}/"><span class="small" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div>${kicker(p.category)}<h3>${e(p.title)}</h3><p>${e(p.preview)}</p></div><span class="circle-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
    </section>
    <section class="wrap section" id="experience">${sectionHead('02','Experience')}
      <div class="experience-list">${experience.map(job=>`<article class="experience-entry"><div><p class="small">${e(job.duration)}</p><h3>${e(job.company)}</h3><p class="role">${e(job.role)}</p></div><div><p>${e(job.summary)}</p>${job.bullets.length?`<details class="details"><summary>What I worked on<span class="sr-only"> at ${e(job.company)}</span></summary>${list(job.bullets)}</details>`:link('/work/kept/','About my role')}</div></article>`).join('')}</div>
      <p class="small earlier-work">${e(earlierWork)}</p>
    </section>
    <section class="wrap section" id="repositories">${sectionHead('03','Repositories',link(profile.github+'?tab=repositories','All on GitHub','text-link',true))}
      <p class="small">Selected public repositories · Updated ${repositorySnapshot.asOf}. See GitHub for the latest.</p>
      <ul class="repository-list">${repositorySnapshot.names.map(name=>`<li>${link(profile.github+'/'+name,name,'repository-link',true)}</li>`).join('')}</ul>
    </section>`;
}

function casePage(slug) {
  if (slug === 'kept') return `${pageHero('Work / 01','Kept','Preserving institutional knowledge and the context behind decisions.')}
    <section class="wrap case-meta" aria-label="Role details"><div>${kicker('Role')}<p>Chief Engineering Officer</p></div><div>${kicker('Focus')}<p>Institutional knowledge & decision context</p></div><div>${kicker('Scope')}<p>Engineering leadership</p></div></section>
    <article class="wrap section case-body"><div>${kicker('Overview')}<h2>Remembering<br>the <em>why.</em></h2></div><div class="reading">
      <p class="lead">Documents record what happened. They don’t always capture why a decision was made, which assumptions mattered, or what someone learned.</p>
      <p>Kept brings that context together with institutional knowledge.</p>
      <h3>My role</h3><p>I lead engineering, turning that idea into a product people can use.</p>
      <h3>Status</h3><p>This is a product and role overview. Implementation details and measured results have not been shared here.</p>
      ${link('/work/#experience','Full experience')}
    </div></article><section class="wrap case-next" aria-label="Next project">${link('/work/care-access/','Next: Care Access','next-link')}</section>`;
  if (slug === 'care-access') return `${pageHero('Work / 02','Care Access','Automation and data systems for healthcare operations.')}
    <section class="wrap case-meta" aria-label="Role details"><div>${kicker('Role')}<p>AI Solutions Architect</p></div><div>${kicker('Dates')}<p>${e(experience[0].duration)}</p></div><div>${kicker('Focus')}<p>Automation · Data · Reliability</p></div></section>
    <article class="wrap section case-body"><div>${kicker('Overview')}<h2>Connected<br><em>workflows.</em></h2></div><div class="reading">
      <p class="lead">I connect the systems people use at work. Logging, diagnostics, and state tracking make the automation easier to understand and maintain.</p>
      <h3>What I work on</h3>${list(experience[0].bullets)}
      <h3>Beyond the integrations</h3><p>I also write runbooks and coordinate handoffs between operations, security, data, and engineering.</p>
      <p class="small">Responsibilities overview. Internal records and unverified performance metrics are not included.</p>
    </div></article><section class="wrap case-next" aria-label="Next project">${link('/work/diatrend/','Next: Diatrend','next-link')}</section>`;
  const p = projects.find(p => p.slug === slug);
  if (!p) throw new Error('Unknown project: ' + slug);
  return `${pageHero('Work / Project',e(p.title),p.preview)}
    <section class="wrap case-meta" aria-label="Project details"><div>${kicker('Area')}<p>${e(p.category)}</p></div><div>${kicker('Format')}<p>Technical project</p></div><div>${kicker('Source')}${p.unavailable?'<p>Repository currently unavailable</p>':link(p.repo,'GitHub','text-link',true)}</div></section>
    <article class="wrap section case-body"><div>${kicker('Overview')}<h2>The <em>project.</em></h2></div><div class="reading">
      <p class="lead">${e(p.focus)}</p><h3>Built with</h3><p>${e(p.description)}</p>
      <h3>Status</h3><p>${e(p.status)}</p>
      ${p.unavailable?`<details class="details"><summary>Original repository reference</summary><p class="small">${e(p.repo)}</p></details>`:link(p.repo,'View source','text-link',true)}
      ${p.slug==='diatrend'?`<p>${link('/research/','Related research')}</p>`:''}
    </div></article><section class="wrap case-next" aria-label="More projects">${link('/work/#projects','All projects','next-link')}</section>`;
}

function researchPage() {
  return `${pageHero('An ongoing question','Research','How context could help artificial pancreas systems.')}
    <section class="wrap research-thesis"><span class="status-tag">${e(research.status)}</span><h2>${e(research.question)}</h2><p class="small">${e(research.affiliation)} · Advised by ${e(research.advisor)}</p></section>
    <section class="wrap section case-body"><div>${kicker('The direction')}<h2>${e(research.title)}</h2></div><div class="reading">
      <p class="lead">${e(research.summary)}</p>
      <p>I’m interested in what the state behind an observation can add to a system’s understanding.</p>
      <h3>Current stage</h3><p>This is a research direction. It is not a published paper, a clinically validated system, or a proven improvement in treatment outcomes.</p>
      <h3>Related work</h3><p>Diatrend explores glucose trajectory prediction from continuous glucose monitoring (CGM) data, using PyTorch, TabTransformer/GNN, and FastAPI.</p>
      ${link('/work/diatrend/','Diatrend')}
      <h3>Let’s talk</h3><p>I welcome conversations about the problem, the approach, and what to explore next.</p>${link('mailto:'+profile.email,'Email me')}
    </div></section>
    <section class="wrap section" aria-label="A working principle"><div class="research-principle">${kicker('A working principle')}<p>Be clear about what is observed,<br>what is inferred,<br><em>and what remains uncertain.</em></p></div></section>`;
}

function life(media) {
  return `${pageHero('Outside work','Life','Singing, songwriting, the gym, football, video games, and traveling.')}
    <nav class="wrap section-nav" aria-label="Life sections">${link('#music','Music')}${link('#photos','Photos')}</nav>
    <section class="wrap section compact-top" id="music"><div class="life-music-layout"><div>${kicker('01')}<h2>Music</h2><p class="reading">${e(profile.personal)}</p><p class="small">${media.tracks.length} songs. Pick one to listen.</p></div>${musicPlayer(media)}</div></section>
    <section class="wrap section" id="photos">${sectionHead('02','Photos')}<p class="small gallery-note">${media.photos.length} images from the camera roll. Open one to see the full photograph.</p><div class="gallery-grid">${media.photos.map(photoTile).join('')}</div></section>${lightbox()}`;
}
function lightbox() {
  return `<dialog class="lightbox" aria-labelledby="lightbox-caption"><button class="lightbox-close" type="button" aria-label="Close photograph">Close <span aria-hidden="true">×</span></button><img class="lightbox-image" alt=""><p id="lightbox-caption"></p><a class="text-link lightbox-original" href="/life/">Open image ${arrow}</a></dialog>`;
}

function about(media) {
  return `${pageHero('A little background','About','I build AI systems for healthcare and operations. Based in Atlanta, GA.')}
    <nav class="wrap section-nav" aria-label="About sections">${link('#education','Education')}${link('#honors','Honors & leadership')}${link('#skills','Skills')}</nav>
    <section class="wrap section compact-top about-intro" aria-label="Introduction"><figure>${image(media.portrait,{sizes:'(max-width: 700px) 60vw, 360px',priority:true})}</figure><div>
      <p class="lead">${e(profile.personal)}</p><p class="reading">My work spans architecture, automation, and research. I’m interested in making systems more useful by helping them understand the context they’re missing.</p>
      <p class="reading">I like building things, asking questions, and learning from people. Outside work: ${e(profile.interests.charAt(0).toLowerCase()+profile.interests.slice(1))}</p>
      <div class="hero-actions">${link('/work/#experience','Experience','button primary')}${link('/documents/resume.pdf','Resume','text-link',true)}</div>
    </div></section>
    <section class="wrap section" id="education">${sectionHead('01','Education')}<div class="education-list">${education.map(x=>`<article class="education-entry"><div><h3>${e(x.school)}</h3><p>${e(x.degree)}</p></div><p class="small">${e(x.note)}</p></article>`).join('')}</div></section>
    <section class="wrap section" id="honors">${sectionHead('02','Honors & leadership')}<div class="two-columns"><div><h3>Honors</h3>${list(honors)}</div><div><h3>Leadership</h3>${list(leadership)}</div></div>${link('/archive/','Supporting documents')}</section>
    <section class="wrap section" id="skills">${sectionHead('03','Skills')}<ul class="skills">${skills.map(s=>`<li>${e(s)}</li>`).join('')}</ul>${link('/work/','See the work')}</section>`;
}

function archive(media) {
 const sizes=media.documents||{};
 return `${pageHero('Documents','Archive','Résumé, awards, certifications, and recommendations.')}<nav class="wrap archive-nav" aria-label="Document groups">${documents.map((g,i)=>link('#group-'+i,g.title,'archive-nav-link')).join('')}</nav><section class="wrap section compact-top" id="documents" aria-label="Documents">${documents.map((g,i)=>`<section class="document-group" id="group-${i}"><h2>${e(g.title)}</h2><ul>${g.items.map(item=>`<li>${item.path?`<a href="${item.path}" target="_blank" rel="noopener noreferrer"><span>${e(item.label)}</span><span class="document-meta">PDF${sizes[item.path]?' · '+Math.ceil(sizes[item.path]/1024)+' KB':''} ${arrow}<span class="sr-only"> (opens in a new tab)</span></span></a>`:`<span>${e(item.label)}<small>Document not available.</small></span>`}</li>`).join('')}</ul></section>`).join('')}</section>`;
}
export function renderPages(media) {
 const pages = [
  {path:'/',title:'Rishabh Chouhan — AI systems, research & a little music',description:profile.introduction+' '+profile.description,body:home(media)},
  {path:'/work/',title:'Work — Rishabh Chouhan',description:'Engineering at Kept and Care Access, technical projects, experience, and a public repository index.',body:work()},
  {path:'/research/',title:'Research — Rishabh Chouhan',description:'Exploring state-aware processing in artificial pancreas loops. Research direction and related technical work.',body:researchPage()},
  {path:'/life/',title:'Life & music — Rishabh Chouhan',description:'Music, photography, and the personal side of Rishabh Chouhan.',body:life(media)},
  {path:'/about/',title:'About — Rishabh Chouhan',description:'Background, education, honors, leadership, skills, and interests.',body:about(media)},
  {path:'/archive/',title:'Archive — Rishabh Chouhan',description:'Résumé, awards, certifications, and recommendation documents.',body:archive(media)},
  ...['kept','care-access',...projects.map(p=>p.slug)].map(slug=>({path:'/work/'+slug+'/',title:(projects.find(p=>p.slug===slug)?.title||experience.find(p=>p.slug===slug)?.company)+' — Rishabh Chouhan',description:'Project and role overview, scope, and supporting context.',body:casePage(slug)})),
  {path:'/404.html',title:'Page not found — Rishabh Chouhan',description:'This page could not be found.',body:`${pageHero('404 / A wrong turn','Not here.','That page doesn’t exist. Try the homepage or archive.')}<div class="wrap not-found-actions">${link('/','Back home','button primary')}${link('/archive/','Explore the archive','button quiet')}</div>`},
 ];
 return pages;
}
export function renderDocument(page,{css,js,noindex=false}) {
 const structured=JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.name,url:profile.origin,email:profile.email,sameAs:[profile.github,profile.linkedin]}).replace(/</g,'\\u003c');
 return `<!doctype html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#faf9f6"><title>${e(page.title)}</title><meta name="description" content="${e(page.description)}"><link rel="canonical" href="${profile.origin+page.path}"><meta name="robots" content="${noindex||page.path==='/404.html'?'noindex,follow':'index,follow'}"><meta property="og:type" content="website"><meta property="og:title" content="${e(page.title)}"><meta property="og:description" content="${e(page.description)}"><meta property="og:url" content="${profile.origin+page.path}"><meta property="og:image" content="${profile.origin}/media/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Rishabh Chouhan — AI systems, research, and a little music"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(page.title)}"><meta name="twitter:description" content="${e(page.description)}"><meta name="twitter:image" content="${profile.origin}/media/social-preview.png"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="${css}"><script type="application/ld+json">${structured}</script><script type="module" src="${js}"></script></head><body>${nav(page.path)}<main id="main" tabindex="-1">${page.body}</main>${contact()}</body></html>`;
}
