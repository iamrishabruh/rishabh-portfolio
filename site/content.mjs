/** Editorial content. Facts are preserved from the original portfolio, not inferred credentials. */
export const profile = {
  name: 'Rishabh Chouhan', email: 'rchouhan.network@gmail.com', location: 'Atlanta, GA',
  origin: 'https://rishabhchouhan.netlify.app', github: 'https://github.com/iamrishabruh',
  linkedin: 'https://www.linkedin.com/in/chouhan-rishabh/', reachmind: 'https://reachmindllc.com',
  introduction: 'I build AI systems that help people work.',
  description: 'My work brings together healthcare, automation, and research. I’m interested in what systems can do with a better understanding of context.',
  personal: 'Also a son, a brother, and a friend to many.',
  interests: 'Singing, songwriting, the gym, football, video games, and traveling.',
};
export const experience = [
  {slug:'care-access',role:'AI Solutions Architect',company:'Care Access',duration:'Jul 2025 – Present',summary:'End-to-end automation and data systems across the org.',bullets:[
    'End-to-end automation systems integrating Monday.com, Slack, Google Workspace, Microsoft Graph, Databricks, Microsoft Fabric',
    'Replaced manual processes with auditable automation pipelines (logging/diagnostics/state tracking)',
    'Dynamic Monday.com workflows (board relations, people columns, form ingestion) for event creation + staffing + study updates',
    'Slack orchestration (channel creation, invites, formatted summaries, mobile-safe rendering)',
    'Secure data engineering pipelines (normalized lookup tables, dedup mappings, curated views via Fabric GraphQL APIs)',
    'Privacy-preserving joins with SHA-256 hashing + secret peppering',
    'Migration to GitHub-based SDLC (repo structure, env-scoped secrets, versioning, deployment practices)',
    'Runbooks + cross-functional bridge across ops/security/data/engineering']},
  {slug:'kept',role:'Chief Engineering Officer',company:'Kept',duration:'Current',summary:'Leading engineering.',bullets:[]},
  {slug:'skincentric',role:'Founding Software Engineer',company:'Skincentric',duration:'Dec 2024 – Mar 2025',summary:'Rebuilt a Flutter skincare app at startup pace.',bullets:[
    'Refactored Flutter skincare app to Dart; improved maintainability/scalability',
    'Component rewrites to reduce technical debt + standardize architecture',
    'Automated testing + QA workflows to reduce regressions']},
  {slug:'kaiser-permanente',role:'Mobile Software Engineering Intern',company:'Kaiser Permanente',duration:'Jun 2023 – Sep 2023',summary:'Swift/SwiftUI drug-interaction proof of concept.',bullets:[
    'Swift/SwiftUI drug interaction POC integrating external clinical APIs',
    'Modular architecture (UI/networking/data separation)', 'XCTest unit/UI tests']},
];
export const earlierWork = 'Before all that: barista, grill cook, server, deli manager, tutor.';
export const projects = [
 {slug:'diatrend',preview:'Predicting glucose trends from continuous monitoring data.',title:'Diatrend',description:'AI-driven CGM trajectory prediction — PyTorch, TabTransformer/GNN, FastAPI.',repo:'https://github.com/iamrishabruh/Diatrend-ML',category:'Healthcare · Machine learning',focus:'Exploring how glucose trajectories can be modeled from continuous glucose monitoring data.',status:'Research project; not a clinically validated system.'},
 {slug:'nexus-lite',preview:'A mobile app for keeping health information together.',title:'Nexus Lite',description:'Cross-platform mobile health tracker — React Native Expo + FastAPI.',repo:'https://github.com/iamrishabruh/Nexus-Lite',category:'Mobile · Healthcare',focus:'A cross-platform interface for bringing health-tracking information together.',status:'Project retained from the original portfolio. The repository link was unavailable during the audit.',unavailable:true},
 {slug:'bennington',preview:'Testing trading strategies with historical data and machine learning.',title:'Bennington',description:'Stock backtesting + ML trading platform — Python, Docker, Cloud Run.',repo:'https://github.com/iamrishabruh/Bennington',category:'Data systems · Finance',focus:'A platform for exploring trading strategies through backtesting and machine learning.',status:'Experimental software, not investment advice or a claim of trading performance.'},
 {slug:'differential-learning',preview:'Learning from distributed data with differential privacy.',title:'Differential Learning',description:'Federated learning with differential privacy — DPAdam, gradient clustering.',repo:'https://github.com/iamrishabruh/Differential-Learning',category:'Machine learning · Privacy',focus:'Exploring learning across distributed data while incorporating differential privacy.',status:'Technical project; no privacy guarantee or measured result is asserted here.'},
 {slug:'drug-interaction-checker',preview:'An iOS prototype for looking up drug interactions.',title:'Drug Interaction Checker',description:'Swift/SwiftUI clinical API proof of concept — XCTest, CI.',repo:'https://github.com/iamrishabruh/Drug-Interaction-Checker',category:'iOS · Healthcare',focus:'A SwiftUI proof of concept connecting a mobile interface to clinical APIs.',status:'Proof of concept, not a clinical decision-making tool.'},
];
export const research = { title:'State-aware processing in artificial pancreas loops', affiliation:'CBA Lab, Georgia Tech', advisor:'Dr. Thomas Plötz', summary:'Exploring the benefits of state-aware processing in artificial pancreas loops.', status:'Research exploration', question:'What changes when a system understands the state behind its observations?' };
export const education = [
 {school:'Georgia Institute of Technology',degree:'M.S. Computer Science',note:'2025 – Present · 4.0 GPA'},
 {school:'Georgia State University',degree:'B.S. Computer Science',note:'2023 – 2025'},
 {school:'University of Georgia',degree:'Undergraduate coursework',note:'2022 – 2023'},
];
export const honors = ["President's List — GSU (Spring 2025, Fall 2024)","Dean's List — GSU (Summer 2024, Spring 2024)",'AP Capstone Diploma · AP Scholar with Distinction','35/36 ACT','Recognized by Kaiser Permanente leadership for internship performance','HOSA State Leadership Conference — 2nd, Medical Terminology (2020)'];
export const leadership = ['Mensa — 20s/30s Coordinator, community events','FBLA (2015 – 2025) — 500+ service hours · 1st in State, Computer Problem Solving (2021) · 2nd in State, Computer Applications (2021) · 2nd in State, Desktop Publishing (2019) · 4th in State, Keyboarding Applications II (2019)','Finance & Investment Club — Founder (2019 – 2022)','AI FinTech Club — Founder (2024 – 2025)'];
export const skills = ['Python','Java','Swift','TypeScript','JavaScript','C++','Rust','React','Node.js','REST APIs','Git','AI/ML','RLHF','iOS','Healthcare Tech','Full-Stack'];
export const documents = [
 {title:'Resume',items:[{label:'Resume (PDF)',path:'/documents/resume.pdf'}]},
 {title:'Academic awards',items:[
  {label:"President's List — Spring 2025",path:'/documents/Spring2025PresidentsList.pdf'},
  {label:"President's List — Fall 2024",path:'/documents/Fall2024PresidentsList.pdf'},
  {label:"Dean's List — Summer 2024",path:'/documents/Summer2024DeansList.pdf'},
  {label:"Dean's List — Spring 2024",path:'/documents/Spring2024DeansList.pdf'},
  {label:'AP Capstone Diploma, AP Scholar with Distinction',path:'/documents/APCapstoneDiploma.pdf'}]},
 {title:'Certifications',items:[
  {label:'Generative AI Engineering with Databricks',path:null},
  {label:'Spring Boot 2.0 Essential Training',path:'/documents/spring-boot-certificate.pdf'},
  {label:'Practical Database Design & SQL Querying',path:'/documents/database-design-certificate.pdf'},
  {label:'PowerPoint 2016: Presentation Design & Delivery',path:'/documents/powerpoint-certificate.pdf'},
  {label:'Word 2016: Document Creation & Collaboration',path:'/documents/word-certificate.pdf'},
  {label:'Excel 2016: Data Analysis & Presentation',path:'/documents/excel-certificate.pdf'},
  {label:'HIPAA Business Associate',path:'/documents/hipaa-certificate.pdf'},
  {label:'Research Skills Certificate',path:'/documents/research-skills-certification.pdf'},
  {label:'Student Health Clinic — Health Privacy',path:'/documents/health-privacy-certificate.pdf'},
  {label:'Biosafety Certificate',path:'/documents/biosafety-certificate.pdf'}]},
 {title:'Recommendations',items:[
  {label:'Dr. Murray Patterson — Algorithms (GSU)',path:'/documents/algorithms-recommendation.pdf'},
  {label:'Dr. Roya Hosseini — Operating Systems (GSU)',path:'/documents/os-recommendation.pdf'},
  {label:'Laura Wilson — Principal, South Forsyth High School',path:'/documents/principal-recommendation.pdf'}]},
];
/** Public repositories returned by the connected GitHub search, September 5, 2026.
 * Curated snapshot, not a claim of a complete or live GitHub feed. Never includes private repos. */
export const repositorySnapshot = {asOf:'2026-09-05',names:['federated-ehr-privacy','data-structures-labs','backtesting-engine','state-conditioned-cgm-risk-evaluation','astar-puzzle-solver','product-data-delivery-pipeline','bb84-qkd-dsl','drug-interaction-swiftui','rishabh-portfolio','trading-bot','cgm-risk-prediction','convert','agent-context-layer','claude-workflow-safety-evals','kinmap','pydantic-ai']};
export const legacyHashes = {experience:'/work/#experience',projects:'/work/#projects',music:'/life/#music',education:'/about/#education',honors:'/about/#honors',skills:'/about/#skills',documents:'/archive/#documents'};
