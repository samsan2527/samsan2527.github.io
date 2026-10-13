export const content = {
  navigation: [{ label: 'About', id: 'about' }, { label: 'Personal Agent', id: 'agent' }, { label: 'Automation', id: 'automation' }, { label: 'Healthcare', id: 'healthcare' }, { label: 'Software', id: 'solutions' }, { label: 'AI Apps', id: 'ai' }, { label: 'Mobile', id: 'mobile' }],
  hero: { eyebrow: 'Independent engineer · Dubai, UAE', lines: ['I build AI agents,', 'automation, and software', 'that run'], emphasis: 'real businesses.', description: 'From the first conversation to the last line of code. I connect intelligent systems to the work that matters.', primary: 'Explore my work', secondary: 'Let’s talk', caption: 'Intelligence, connected to the real world.', rotating: ['Smart chat agents', 'MCP integrations', 'EMR systems', 'Computer vision', 'Workflow automation'] },
  expertise: { label: '01 / What I do', title: 'Three disciplines.', emphasis: 'One connected system.', description: 'Intelligence is only useful when it works with your business. I build the agents, connect the workflows, and engineer the software beneath them.' },
  solutions: { label: '02 / Built for your business', title: 'Complex operations.', emphasis: 'Considered software.', description: 'Purpose-built systems, designed around the way your team actually works. Explore the building blocks.' },
  work: { label: '03 / Selected work', title: 'Less friction.', emphasis: 'More possibility.', description: 'A look inside the systems: the problem, the architecture, and the thinking behind the build.', note: 'Project outlines · client details anonymized · outcomes awaiting verification' },
  process: { label: '04 / How I work', title: 'From moving parts', emphasis: 'to working systems.', description: 'A direct line from your business problem to a thoughtfully engineered solution.', steps: [{ title: 'Understand', text: 'Map your workflow, find the bottleneck, and define what a useful outcome looks like.' }, { title: 'Architect', text: 'Design the connections, permissions, and failure paths before writing the first integration.' }, { title: 'Build & connect', text: 'Work in small, testable increments. Make each part work, then make them work together.' }, { title: 'Refine & support', text: 'Deploy with visibility, document the system, and improve it around real usage.' }], nodes: ['Input', 'AI Layer', 'Automation', 'Your Systems'] },
  about: { label: '05 / The engineer behind the systems', title: 'A builder first.', emphasis: 'A partner throughout.', paragraphs: ['I’m Santhosh William, an AI, automation and software development engineer based in Dubai. I work at the intersection of intelligent software and the everyday operations that keep a business moving.', 'My focus is practical: a WhatsApp AI agent that knows when to hand over. An MCP integration that respects system boundaries. An EMR that fits the clinic, and automation that gives people their time back.'], principles: ['Business context before code', 'Clear architecture. Thoughtful details.', 'Built to be understood and maintained'] },
  contact: { label: 'Start a conversation', title: 'Let’s talk about', emphasis: 'your project.', description: 'Tell me what you need. I’ll get back to you by email.', interests: ['Personal Agent', 'AI', 'Automation', 'Healthcare Integration', 'RCM', 'Software', 'Mobile Apps', 'Website', 'Other'], budgets: ['Prefer to discuss', 'Under AED 10,000', 'AED 10,000–30,000', 'AED 30,000–75,000', 'AED 75,000+'] },
  industries: ['Healthcare', 'Insurance', 'Banking & Finance', 'HR & Recruitment', 'Fitness', 'Retail', 'Enterprise'],
  stack: ['Python', 'Node.js', 'FastAPI', '.NET', 'React', 'React Native', 'Flutter', 'PostgreSQL', 'SQL Server', 'OpenAI', 'Claude', 'MCP', 'Whisper', 'OpenCV', 'YOLO', 'Tesseract', 'Docker', 'IIS', 'Azure', 'n8n'],
};

// The home page is organized into two application collections.
export const showcase = {
  hero: { label: 'Independent thinking. Intelligent engineering.', lines: ['Intelligent by design.', 'Built for your business.'], description: 'AI that understands the task. Software that gets it done. Custom-built in Dubai, for businesses ready for what’s next.', cta: 'Explore the applications', footnote: 'AI · AUTOMATION · SOFTWARE' },
  statement: { label: 'Two disciplines. One builder.', lead: 'Your tools should work together.', rest: 'Your team should move forward. I build the intelligence and the software that make both happen.' },
  ai: { title: 'AI-based applications.', subtitle: 'Less artificial. More useful.', description: 'From your Personal Agent to a chatbot built around your business. Intelligence that connects to your tools and turns intent into action.' },
  software: { title: 'Software applications.', subtitle: 'Your business, beautifully connected.', description: 'A clinic. A sales team. An entire operation. Explore a collection of purpose-built applications, one story at a time.' },
  about: { title: 'One engineer.', emphasis: 'The whole picture.', text: 'I’m Santhosh William, an AI and software development engineer in Dubai. I bring the conversation, the architecture, and the build together — so your idea doesn’t get lost between teams.', principles: [{title:'Understand the real work.',text:'Start with your people, your systems, and the steps that get in their way.'},{title:'Make the parts connect.',text:'Thoughtful interfaces. Clear permissions. Integrations that hold together.'},{title:'Build for what comes next.',text:'Useful today. Understandable tomorrow. Ready to evolve with your business.'}] },
};

// The Personal Agent tab: one agent across the tools a team already uses.
export const personalAgent = {
  title: 'Every inbox, meeting and chat.', emphasis: 'One agent.',
  description: 'Connect your email, meetings, Slack, ClickUp, Microsoft Teams and WhatsApp to a single Personal Agent. No more jumping between portals — ask once, and it works across all of them.',
  points: ['Ask in plain language — it searches every connected app at once', 'Summarizes meetings and turns action points into ClickUp tasks', 'Drafts replies for email, Slack, Teams and WhatsApp', 'Asks for your approval before sending or changing anything'],
  connectors: [
    { name: 'Email', detail: 'Gmail & Outlook inboxes', icon: 'mail' },
    { name: 'Meetings', detail: 'Calendar, notes & follow-ups', icon: 'calendar' },
    { name: 'Slack', detail: 'Channels & direct messages', icon: 'chat' },
    { name: 'ClickUp', detail: 'Tasks, lists & deadlines', icon: 'task' },
    { name: 'Microsoft Teams', detail: 'Chats & channel updates', icon: 'chat' },
    { name: 'WhatsApp', detail: 'Customer & team conversations', icon: 'chat' },
  ],
  example: { prompt: 'What needs my attention today?', reply: 'Here’s your day across all your apps:', items: [['Email', '3 client emails are waiting for a reply'], ['Meetings', '10:00 weekly review — last week’s notes are ready'], ['ClickUp', '2 tasks are due today'], ['Slack', 'You were mentioned in #sales'], ['WhatsApp', 'A customer asked to book a demo']] },
};

// The Automation tab: manual operations handed to agents, by business area.
export const automation = {
  title: 'Stop waiting on manual work.', emphasis: 'Let agents do it.',
  description: 'Data entry, follow-ups, approvals and reconciliations, handled by AI agents that work around the clock. Your team reviews the exceptions instead of doing every step by hand.',
  manual: ['Copying data between spreadsheets and systems', 'Chasing approvals over email and calls', 'Waiting days for reports and reconciliations', 'Mistakes found only at month-end'],
  automated: ['Agents read, enter and check the data for you', 'Approvals routed automatically, with reminders', 'Reports and reconciliations ready every morning', 'Exceptions flagged early for a person to review'],
  areas: [
    { title: 'Finance', items: ['Invoice capture and matching', 'Bank reconciliations', 'Expense checks and month-end reports'] },
    { title: 'HR', items: ['CV screening and interview scheduling', 'Onboarding documents and checklists', 'Leave, attendance and payroll inputs'] },
    { title: 'Procurement', items: ['Purchase requests and quote comparison', 'Purchase orders and supplier follow-ups', 'Goods receipt and invoice matching'] },
    { title: 'Insurance', items: ['Claims intake and document checks', 'Pre-approval requests and status updates', 'Policy renewals and member changes'] },
    { title: 'Approvals', items: ['Routing to the right approver', 'Reminders and escalations', 'A full audit trail of every decision'] },
    { title: 'Banking', items: ['Account-opening document checks', 'KYC and transaction reviews', 'Statement processing and alerts'] },
  ],
};

// The Healthcare tab: HL7 exchange connectivity, revenue cycle management and supporting apps.
export const healthcare = {
  title: 'Your clinic system, connected.', emphasis: 'The way regulators expect.',
  description: 'I connect your local EMR or clinic app to the UAE health information exchanges using HL7, so patient visits, results and documents reach the government portals automatically — no double entry.',
  exchanges: [
    { name: 'Malaffi', region: 'Abu Dhabi', authority: 'Department of Health – Abu Dhabi' },
    { name: 'NABIDH', region: 'Dubai', authority: 'Dubai Health Authority' },
    { name: 'Riayati', region: 'Northern Emirates', authority: 'Emirates Health Services' },
  ],
  messages: ['Patient registration & visits (ADT)', 'Lab & radiology results (ORU)', 'Orders (ORM / OML)', 'Clinical documents & summaries', 'Acknowledgement (ACK) tracking', 'Validation, queueing & automatic retries'],
  note: 'Each exchange requires facility onboarding and approval by its authority. Integrations are built to their published HL7 specifications.',
  rcm: { title: 'RCM app', lead: 'Revenue cycle management, from first visit to final payment.', items: ['Insurance eligibility & pre-authorization', 'Medical coding (ICD-10 & CPT)', 'E-claims submission to payer portals', 'Remittance reconciliation', 'Denial management & resubmission', 'Revenue and claims dashboards'] },
  support: [
    { title: 'Patient app & bookings', text: 'Online appointments, reminders and visit history for patients.' },
    { title: 'Lab integration (LIS)', text: 'Orders and results flowing between analyzers, lab and EMR.' },
    { title: 'Pharmacy & e-prescription', text: 'Prescriptions, stock and dispensing connected to the visit.' },
    { title: 'Telehealth', text: 'Secure video consultations with notes saved to the record.' },
    { title: 'WhatsApp patient assistant', text: 'Bookings, reminders and FAQs answered on WhatsApp.' },
    { title: 'Queue & token displays', text: 'Waiting-room tokens, counters and live display screens.' },
  ],
};

export const aiApplications = [
  { id: 'personal-agent', title: 'Personal Agent', type: 'Everything in one agent', headline: 'Every inbox and chat.\nOne agent.', summary: 'One AI agent connected to your email, meetings, Slack, ClickUp, Microsoft Teams and WhatsApp. Ask in plain language instead of switching between portals.', features: ['Email & meetings', 'Slack, Teams & WhatsApp', 'ClickUp tasks', 'Approval before sending'], caseId: 'personal-agent', visual: 'agent', prompt: 'What needs my attention today?', response: 'Here’s your day across every connected app. Review the drafts below before I send anything.', steps: ['Check email, chats and mentions', 'Summarize today’s meetings', 'List ClickUp tasks due today'], color: 'mint' },
  { id: 'custom-chatbot', title: 'Custom chatbots', type: 'Your business. Your voice.', headline: 'A better first hello.\nAnd a useful next step.', summary: 'A WhatsApp, website, or voice agent shaped around your business. Answer questions, capture leads, book appointments, and hand over to your team with the context intact.', features: ['WhatsApp & web', 'Knowledge-grounded answers', 'Booking & lead capture', 'Human handoff'], caseId: 'patient-agent', visual: 'chat', prompt: 'Can I book a consultation for tomorrow?', response: 'Of course. Which branch would you prefer? I can help you find a suitable appointment.', steps: ['Understand the request', 'Check your booking system', 'Confirm with the customer'], color: 'peach' },
  { id: 'mcp', title: 'MCP integrations', type: 'Intelligence, with connections', headline: 'Your systems.\nIn the conversation.', summary: 'Connect approved EMR, CRM, ERP, and database operations to ChatGPT and Claude through scoped MCP tools. Give the assistant useful context with clear boundaries.', features: ['Scoped tool access', 'EMR / CRM / ERP', 'ChatGPT & Claude', 'Audit-ready actions'], caseId: 'mcp-healthcare', visual: 'agent', prompt: 'Find the current appointment availability.', response: 'I can query the scheduling system with read-only access. Here’s the connection plan.', steps: ['Authenticate the request', 'Call the approved MCP tool', 'Return source-backed context'], color: 'sky' },
  { id: 'cv', title: 'Smart CV Screen', type: 'Recruitment, with clarity', headline: 'Find the relevant.\nKeep the human judgment.', summary: 'Turn unstructured CVs into reviewable candidate profiles. Match experience to job criteria and help recruiters spend more time on meaningful conversations.', features: ['Resume parsing', 'Criteria-based ranking', 'Reviewable evidence', 'Recruiter control'], caseId: 'cv-screen', visual: 'agent', prompt: 'Organize these CVs against our role requirements.', response: 'I’ll extract relevant experience and show the evidence for your team to review.', steps: ['Parse candidate experience', 'Match the stated criteria', 'Prepare the review shortlist'], color: 'peach' },
  { id: 'vision', title: 'AI Smart Cam', type: 'A clearer view of operations', headline: 'See the pattern.\nImprove the everyday.', summary: 'Computer vision for people counting, queues, occupancy, and safety signals. Turn camera activity into a useful operational view across branches.', features: ['People & occupancy', 'Queue analytics', 'PPE / safety signals', 'Multi-branch insights'], caseId: 'smart-cam', visual: 'vision', prompt: 'Help me understand branch occupancy.', response: 'The proposed pipeline turns selected camera feeds into aggregate operational signals.', steps: ['Process selected video feeds', 'Aggregate operational events', 'Surface reviewable insights'], color: 'sky' },
  { id: 'voice', title: 'Voice & Document AI', type: 'From unstructured to understood', headline: 'Speak naturally.\nPut information to work.', summary: 'Arabic and English voice workflows, medical scribe assistance, ID reading, and document extraction. Bring spoken and printed information into your systems.', features: ['Speech-to-text & TTS', 'Arabic & English', 'OCR / document extraction', 'Review before saving'], caseId: 'kiosk', visual: 'voice', prompt: 'Turn this conversation into a structured draft.', response: 'I’ll transcribe, extract the key details, and prepare a draft for your review.', steps: ['Capture speech or document', 'Extract structured information', 'Review and approve the draft'], color: 'mint' },
];

export const softwareStories = {
  emr: {headline:'Better connected care.\nFrom arrival to follow-up.', category:'Healthcare', visual:'clinic', color:'mint'},
  insurance: {headline:'Every policy. Every claim.\nA clearer picture.', category:'Insurance', visual:'board', color:'sky'},
  mobile: {headline:'Your business.\nIn the palm of a hand.', category:'Mobile experiences', visual:'mobile', color:'peach'},
  hrms: {headline:'More time for people.\nLess time on paperwork.', category:'People operations', visual:'people', color:'peach'},
  attendance: {headline:'Every shift accounted for.\nEvery team connected.', category:'People operations', visual:'people', color:'sky'},
  crm: {headline:'A better relationship.\nAt every next step.', category:'Customer relationships', visual:'board', color:'peach'},
  erp: {headline:'The whole operation.\nOne shared picture.', category:'Business operations', visual:'board', color:'mint'},
  finance: {headline:'Know the numbers.\nSee the way forward.', category:'Finance', visual:'finance', color:'sky'},
  banking: {headline:'Thoughtful systems.\nFor financial operations.', category:'Banking', visual:'finance', color:'sky'},
  gym: {headline:'Build a stronger club.\nOne member at a time.', category:'Fitness', visual:'people', color:'mint'},
  dms: {headline:'The right document.\nAlways within reach.', category:'Document management', visual:'board', color:'sky'},
  assets: {headline:'Know what you own.\nAnd what needs attention.', category:'Asset management', visual:'board', color:'mint'},
  token: {headline:'Less waiting.\nA better welcome.', category:'Queue management', visual:'clinic', color:'peach'},
  web: {headline:'A considered presence.\nA memorable first impression.', category:'Websites & web apps', visual:'web', color:'peach'},
  brand: {headline:'A distinct identity.\nAcross every touchpoint.', category:'Brand & motion', visual:'brand', color:'mint'},
};

export const pillars = [
  { id: 'ai', number: '01', title: 'AI Solutions', short: 'Intelligence with intent.', description: 'Agents that understand. Systems that see. Intelligence that moves your business forward.', services: [
    { name: 'Smart Chat Agents', detail: 'WhatsApp, web and voice; booking, FAQ, lead capture and human handoff.' },
    { name: 'Agentic AI', detail: 'Multi-step agents acting across business systems with clear permissions.' },
    { name: 'MCP Integrations', detail: 'Connect EMR, CRM, ERP and databases to ChatGPT and Claude.' },
    { name: 'Smart CV Screen', detail: 'AI resume parsing, scoring and ranking with human review.' },
    { name: 'AI Smart Cam', detail: 'People counting, occupancy, queues, PPE/safety and heatmaps.' },
    { name: 'Voice AI', detail: 'Speech-to-text, TTS and medical scribe workflows in Arabic and English.' },
    { name: 'Document AI / OCR', detail: 'ID/passport reading, invoice and lab report extraction with VLMs.' },
    { name: 'LLM Apps', detail: 'RAG knowledge bases and internal copilots grounded in your information.' },
  ] },
  { id: 'automation', number: '02', title: 'Automation', short: 'Make the busywork disappear.', description: 'Connect the tools you have. Remove the repetitive steps. Let your team focus on the work only they can do.', services: [
    { name: 'Lab report automation', detail: 'From incoming reports to structured, reviewable clinical data.' },
    { name: 'Paperless workflows', detail: 'Digital approvals and traceable document routing.' },
    { name: 'Meeting-to-task automation', detail: 'Turn decisions into assigned, trackable tasks.' },
    { name: 'Event-triggered WhatsApp', detail: 'Consent-aware notifications at the right point in the workflow.' },
    { name: 'Health device integrations', detail: 'Wearable and health device API connections.' },
    { name: 'Middleware & legacy systems', detail: 'Reliable bridges between systems that were never built to talk.' },
    { name: 'Reports & data pipelines', detail: 'Scheduled reports and consistent data delivery.' },
    { name: 'Self-service kiosks', detail: 'STT/TTS, ID scanning and check-in workflows.' },
  ] },
  { id: 'software', number: '03', title: 'Software', short: 'A foundation for what’s next.', description: 'Purpose-built applications that bring your operations together. From a focused tool to a complete enterprise platform.', services: [
    { name: 'Healthcare & insurance', detail: 'EMR, clinic operations, claims and provider networks.' },
    { name: 'Business operations', detail: 'HRMS, attendance, CRM, ERP and finance.' },
    { name: 'Mobile & web apps', detail: 'Native and cross-platform experiences, websites and e-commerce.' },
    { name: 'Specialist systems', detail: 'Banking, gym, document, asset and queue management.' },
    { name: 'Branding & identity', detail: 'Logo design, identity systems and AI-assisted motion assets.' },
  ] },
];

const product = (id, title, category, summary, modules, features, integrations, stack) => ({ id, title, category, summary, modules, features, integrations, stack });
export const solutions = [
  product('emr', 'EMR / Clinic Management', 'Healthcare', 'One connected view of your clinic. From the first appointment to the final claim.', ['Patient Registration', 'Appointments & Scheduling', 'Queue & Token', 'Consultation & SOAP Notes', 'Vitals & Nursing', 'E-Prescription', 'Laboratory (LIS)', 'Radiology (RIS/PACS)', 'Pharmacy', 'Billing & Invoicing', 'Insurance Claims & Pre-Auth', 'Inventory', 'Patient Portal & App', 'Telemedicine', 'AI Medical Scribe', 'Referrals', 'Medical Certificates', 'Analytics Dashboard', 'Roles & Audit Logs', 'HL7/FHIR', 'UAE Integrations'], ['A connected patient journey', 'Role-based access and audit trails', 'Configurable clinic workflows', 'AI assistance with clinical review'], ['DHA / NABIDH', 'DOH / Malaffi', 'eClaimLink', 'HL7 / FHIR', 'Laboratory devices', 'Payment gateways'], ['.NET', 'React', 'SQL Server', 'FastAPI']),
  product('insurance', 'Insurance Management', 'Insurance', 'Bring policies, members and claims into a coherent operational view.', ['Policies', 'Enrollment', 'Claims', 'Pre-Approvals', 'TPA', 'Provider Network', 'Member Portal', 'AI Fraud Flagging'], ['Track claims through review', 'Manage member eligibility', 'Flag anomalies for human investigation'], ['Provider APIs', 'EMR', 'Payment gateways'], ['.NET', 'React', 'SQL Server']),
  product('mobile', 'Mobile Apps', 'Digital experiences', 'Useful, carefully engineered experiences for the device already in your customer’s hand.', ['iOS', 'Android', 'Cross-Platform', 'Authentication', 'Notifications', 'Offline Workflows'], ['Native and cross-platform delivery', 'Accessible interfaces', 'API-connected experiences'], ['REST APIs', 'Push notifications', 'Payment gateways'], ['React Native', 'Flutter', 'Node.js']),
  product('hrms', 'HR Software', 'People operations', 'A better everyday experience for your people and the team supporting them.', ['Employee Records', 'Onboarding', 'Leave', 'Payroll', 'Performance', 'Document Expiry Alerts', 'Self-Service', 'Smart CV Screen'], ['Visa and Emirates ID expiry reminders', 'Configurable approvals', 'AI-assisted recruitment with human review'], ['Attendance', 'Finance', 'Email'], ['.NET', 'React', 'PostgreSQL']),
  product('attendance', 'Attendance', 'People operations', 'Give every shift, location and working hour a reliable record.', ['Face Recognition', 'Geo-Fenced Check-In', 'Shifts', 'Overtime', 'Payroll Sync'], ['Configurable attendance rules', 'Branch-level visibility', 'Exception review'], ['HRMS', 'Payroll', 'Access devices'], ['Python', 'OpenCV', 'React']),
  product('crm', 'CRM', 'Business operations', 'Keep every lead, conversation and next step connected.', ['Leads', 'Pipeline', 'Follow-Ups', 'Email & WhatsApp', 'Campaigns', 'AI Lead Scoring'], ['A shared customer history', 'Timely follow-up automation', 'Explainable scoring for sales review'], ['WhatsApp Business API', 'Email', 'Web forms'], ['Node.js', 'React', 'PostgreSQL']),
  product('erp', 'ERP', 'Business operations', 'Bring purchasing, stock and sales into one operational picture.', ['Procurement', 'Inventory', 'Sales', 'Purchase Orders', 'Multi-Branch', 'Approvals'], ['Branch-aware inventory', 'Traceable approval paths', 'Consistent operational reporting'], ['Finance', 'CRM', 'Barcode devices'], ['.NET', 'React', 'SQL Server']),
  product('finance', 'Finance', 'Financial systems', 'Clear books, connected workflows and fewer manual reconciliations.', ['General Ledger', 'AP / AR', 'Invoicing', 'UAE / KSA VAT', 'Expenses', 'Reports'], ['Configurable tax workflows', 'Expense approvals', 'Reporting and reconciliation'], ['ERP', 'Bank feeds', 'Payment gateways'], ['.NET', 'React', 'PostgreSQL']),
  product('banking', 'Banking', 'Financial systems', 'Focused software for account operations and document-heavy workflows.', ['Accounts', 'Transactions', 'Loans', 'KYC with OCR', 'Reporting'], ['Reviewable document extraction', 'Role-based workflows', 'Traceable account operations'], ['Core banking APIs', 'Identity services', 'Document storage'], ['.NET', 'Python', 'SQL Server']),
  product('gym', 'Gym Management', 'Fitness', 'An easier way to run your club, and a better way to be a member.', ['Memberships', 'Renewals', 'Class Booking', 'Trainers', 'Access Control', 'Payments', 'Member App'], ['Renewal reminders', 'Class capacity management', 'Member self-service'], ['Access devices', 'Payment gateways', 'WhatsApp'], ['Node.js', 'Flutter', 'PostgreSQL']),
  product('dms', 'Document Management', 'Business operations', 'The right document, the current version, and a clear trail of decisions.', ['Versioning', 'OCR Search', 'Approvals', 'Access Control', 'E-Signatures'], ['Searchable document content', 'Controlled distribution', 'Traceable review cycles'], ['OCR services', 'E-sign providers', 'ERP'], ['Python', 'React', 'PostgreSQL']),
  product('assets', 'Asset Management', 'Business operations', 'Know what you own, where it is, and what needs attention.', ['Asset Register', 'QR / Barcode Tags', 'Assignments', 'Maintenance', 'Depreciation', 'Audits'], ['Asset lifecycle visibility', 'Scheduled maintenance', 'Assignment history'], ['Finance', 'HRMS', 'Barcode scanners'], ['.NET', 'React', 'SQL Server']),
  product('token', 'Token / Queue Management', 'Customer experience', 'A calmer waiting room starts with a clearer flow.', ['Kiosk Tokens', 'Counter Displays', 'SMS Notifications', 'Wait-Time Analytics', 'Multi-Branch'], ['Live queue visibility', 'Priority routing', 'Branch-level reporting'], ['EMR', 'Kiosks', 'SMS gateways'], ['Node.js', 'React', 'PostgreSQL']),
  product('web', 'Websites', 'Digital experiences', 'Fast, distinctive websites that give your business a considered presence.', ['Static Websites', 'Dynamic / CMS', 'WordPress', 'E-Commerce', 'Landing Pages', 'Web Apps'], ['Responsive by design', 'Accessible navigation', 'Thoughtful content architecture'], ['CMS', 'Payment gateways', 'CRM'], ['HTML / CSS / JS', 'React', 'WordPress']),
  product('brand', 'Branding', 'Creative systems', 'A coherent visual identity, from the first impression to the smallest detail.', ['Logo Design', 'Brand Identity', 'Motion Assets', 'AI-Assisted Video'], ['Consistent visual language', 'Reusable identity assets', 'Digital-first delivery'], ['Websites', 'Social channels', 'Event screens'], ['SVG', 'Motion design', 'AI creative tools']),
];

const caseStudy = (id, title, pillar, industry, client, summary, problem, solution, architecture, stack, metric) => ({ id, title, pillar, industry, client, summary, problem, solution, architecture, stack, metrics: [{ value: metric, label: 'Illustrative target · not a verified result' }], cover: `./assets/${id}.svg`, status: 'Project outline — implementation details and outcomes to be verified.' });
export const caseStudies = [
  caseStudy('smartlab', 'SmartLab', 'Automation', 'Healthcare', 'Healthcare group, UAE & KSA', 'From lab report to patient record. Without the repetition.', 'Lab reports arrive in different formats. Manual entry introduces delays and makes reviewing the original source harder.', 'A proposed extraction pipeline normalizes incoming reports, routes exceptions for review, and delivers approved results to the clinical system.', ['Lab report', 'OCR / Parser', 'Review', 'EMR'], ['Python', 'FastAPI', 'OCR', 'EMR API'], '[XX hrs/week saved]'),
  caseStudy('personal-agent', 'Personal Agent', 'AI', 'Enterprise', 'Busy professional and operations team', 'Every inbox, meeting and chat in one agent.', 'Work is scattered across email, meetings, Slack, ClickUp, Microsoft Teams and WhatsApp, so people spend the day switching portals to find what needs attention.', 'One agent connects to each app, answers plain-language questions across all of them, drafts replies and tasks, and asks for approval before sending or changing anything.', ['Email', 'Meetings', 'Chats', 'Agent', 'Actions'], ['Python', 'OpenAI', 'MCP', 'PostgreSQL'], '[XX tasks automated]'),
  caseStudy('patient-agent', 'WhatsApp AI patient agent', 'AI', 'Healthcare', 'Multi-branch healthcare group, UAE & KSA', 'A more helpful front door to patient care.', 'Patients need booking and administrative support while reception teams juggle calls and in-person care.', 'A WhatsApp agent handles administrative FAQs and booking intent, connects to scheduling, and hands complex conversations to a person.', ['WhatsApp', 'Agent', 'LLM', 'EMR API'], ['WhatsApp API', 'FastAPI', 'OpenAI'], '[XX% queries assisted]'),
  caseStudy('cv-screen', 'Smart CV Screen', 'AI', 'HR & Recruitment', 'Recruitment operations team', 'Give recruiters context, not another pile of CVs.', 'Recruiters spend time reformatting resumes and checking requirements across inconsistent documents.', 'A reviewable parsing and ranking workflow maps experience to job criteria, keeping hiring decisions with the recruitment team.', ['Resume', 'Parser', 'Criteria', 'Review'], ['Python', 'Document AI', 'PostgreSQL'], '[XX hrs/requisition saved]'),
  caseStudy('mcp-healthcare', 'Healthcare MCP connectors', 'AI', 'Healthcare', 'Healthcare systems team', 'Connect the assistant to the source of truth.', 'Clinical and operational systems have separate interfaces, making useful context difficult to retrieve consistently.', 'Scoped MCP tools expose approved system operations with explicit permissions, validation and audit records.', ['Assistant', 'MCP', 'Permissions', 'EMR'], ['MCP', 'Claude', 'FastAPI', 'FHIR'], '[XX systems connected]'),
  caseStudy('appointment-api', 'Appointment API middleware', 'Automation', 'Healthcare', 'Multi-site clinic operator', 'One scheduling language across disconnected systems.', 'Scheduling interfaces differ between systems, creating fragile integrations and inconsistent booking states.', 'A middleware layer normalizes appointment data, validates requests and provides retry-safe synchronization.', ['Channels', 'API', 'Validation', 'Scheduler'], ['.NET', 'REST APIs', 'SQL Server'], '[XX manual steps removed]'),
  caseStudy('smart-cam', 'AI Smart Cam', 'AI', 'Retail', 'Multi-branch operations group', 'Turn activity into operational understanding.', 'Teams lack a consistent view of occupancy, queues and operational conditions across locations.', 'A proposed computer vision pipeline processes selected camera feeds into aggregate operational signals, with configurable retention.', ['Camera', 'Vision', 'Events', 'Dashboard'], ['OpenCV', 'YOLO', 'Python'], '[XX branches connected]'),
  caseStudy('kiosk', 'Self-service kiosk', 'Automation', 'Healthcare', 'Outpatient care provider', 'A simpler arrival, in more than one language.', 'Reception queues grow when identity capture and check-in need repeated manual input.', 'A guided kiosk combines speech interaction, ID OCR and staff-assisted exception handling for check-in.', ['Speech / ID', 'Whisper / OCR', 'Validation', 'Check-in'], ['Whisper', 'TTS', 'Tesseract', 'FastAPI'], '[XX min/check-in saved]'),
  caseStudy('community', 'Community WhatsApp automation', 'Automation', 'Enterprise', 'Community operations team', 'The right update, at the right moment.', 'Manual community updates require repeated coordination and make opt-out preferences harder to track.', 'An event-driven messaging workflow connects approved templates, subscriber preferences and delivery logging.', ['Event', 'Workflow', 'WhatsApp', 'Delivery log'], ['n8n', 'WhatsApp API', 'Node.js'], '[XX hrs/month saved]'),
  caseStudy('event-brand', 'Event identity & motion', 'Software', 'Creative', 'Event organizing team', 'One identity. Every touchpoint.', 'Event communications need a consistent visual identity across print, digital and on-screen motion.', 'An identity system pairs a flexible logo with reusable digital assets and AI-assisted motion explorations.', ['Brief', 'Identity', 'Motion', 'Touchpoints'], ['SVG', 'Motion design', 'AI video'], '[XX assets delivered]'),
];

// Plain-language homepage descriptions. Product details remain in the catalog.
export const simpleDescriptions = {
  emr: 'Manage patients, appointments, medical records, and billing.',
  insurance: 'Keep policies, members, approvals, and claims in one place.',
  mobile: 'Custom iPhone and Android apps for your customers or team.',
  hrms: 'Manage employee records, leave, payroll, and onboarding.',
  attendance: 'Track check-ins, shifts, working hours, and overtime.',
  crm: 'Organize leads, customer details, and sales follow-ups.',
  erp: 'Connect purchasing, inventory, sales, and branches.',
  finance: 'Manage invoices, expenses, accounts, and financial reports.',
  banking: 'Support account, transaction, and document workflows.',
  gym: 'Manage memberships, classes, trainers, and payments.',
  dms: 'Store, search, share, and approve business documents.',
  assets: 'Track equipment, assignments, maintenance, and repairs.',
  token: 'Manage waiting lines, tokens, and counter displays.',
  web: 'Business websites, online stores, and web applications.',
  brand: 'Logos, brand identities, and digital designs.',
  'personal-agent': 'One AI agent for your email, meetings, Slack, ClickUp, Teams and WhatsApp — no switching between portals.',
  'custom-chatbot': 'A chatbot for your website or WhatsApp that answers questions and helps with bookings.',
  mcp: 'Connect AI assistants to your business systems with controlled access.',
  cv: 'Organize CVs and highlight relevant experience for your recruitment team to review.',
  vision: 'Use camera feeds to understand visitor numbers, waiting lines, and occupancy.',
  voice: 'Turn speech and documents into useful text and records for your team to review.',
};

// Mobile applications and the connections available around them.
export const mobileApps = [
  { title: 'AI Camera App', description: 'Use a phone camera to read text, recognize objects, and send information to your workflow.' },
  { title: 'Claude MCP', description: 'Connect Claude to your app’s data and tools through approved MCP integrations.' },
  { title: 'ChatGPT MCP', description: 'Connect ChatGPT to your business data and tools through approved MCP integrations.' },
  { title: 'API Connectivity', description: 'Connect your mobile app to bookings, payments, customer records, and other business systems.' },
];
