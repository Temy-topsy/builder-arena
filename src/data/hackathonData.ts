import { Track, TimelineStep, ScheduleDay, BuilderProfile, SponsorTier, FinalistTeam } from '../types';
import { CreditCard, Sprout, Layers, Cpu, Wifi, Zap, Package, Video } from 'lucide-react';

export const HERO_STATS = [
  { value: '15', label: 'FINALIST TEAMS', highlight: '#00D9FF' },
  { value: '75', label: 'BUILDERS', highlight: '#B78CFF' },
  { value: '48H', label: 'BUILD SPRINT', highlight: '#FFB800' },
  { value: '4', label: 'CHALLENGE TRACKS', highlight: '#F451D7' },
];

export const NIGERIAN_PROBLEMS = [
  "How can farmers reach better markets?",
  "How can students access financial services?",
  "How can digital identity become more trustworthy?",
  "How can AI improve everyday Nigerian businesses?",
  "How can micro-merchants accept digital payments frictionlessly?",
  "How can supply-chain transparency eliminate agricultural waste?",
];

export const TRACKS_DATA: Track[] = [
  {
    id: 'fintech',
    name: 'FINTECH',
    icon: CreditCard,
    emoji: '',
    shortDesc: 'Reimagining how Nigerians access and use financial services.',
    fullDesc: 'Empowering 200M+ Nigerians with frictionless, accessible, and resilient financial technology. From student micro-loans to decentralized payment channels.',
    color: '#00D9FF',
    borderColor: 'rgba(0, 217, 255, 0.4)',
    lightBg: 'rgba(0, 217, 255, 0.08)',
    buildAround: [
      'Financial inclusion',
      'Micro-payments',
      'Student finance',
      'Credit access',
      'Savings',
      'Payment infrastructure',
    ],
    sampleProblems: [
      'Building offline-capable USSD/SMS micro-payment rails for rural traders.',
      'Algorithmic credit scoring for university students with no credit history.',
      'Automated group savings (Ajo/Esusu) on transparent smart ledgers.',
    ],
    recommendedTools: ['Flutterwave API', 'Paystack API', 'Stripe', 'Solana Web3.js', 'React Native'],
    ctaText: 'EXPLORE FINTECH →',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'agritech',
    name: 'AGRICTECH',
    icon: Sprout,
    emoji: '',
    shortDesc: 'Technology for a smarter, more connected agricultural ecosystem.',
    fullDesc: 'Eliminating post-harvest loss, connecting rural farmers directly to urban consumer markets, and providing AI-driven crop diagnostic insights.',
    color: '#FFB800',
    borderColor: 'rgba(255, 184, 0, 0.4)',
    lightBg: 'rgba(255, 184, 0, 0.08)',
    buildAround: [
      'Smart farming',
      'Supply-chain transparency',
      'Farmer marketplaces',
      'Market access',
      'Agricultural data',
      'Farm management',
    ],
    sampleProblems: [
      'Direct farm-to-buyer bidding marketplace bypassing middle-man exploitation.',
      'AI leaf disease detection via low-end mobile phone camera upload.',
      'IoT cold-chain telemetry & transit route optimizer for perishable produce.',
    ],
    recommendedTools: ['TensorFlow Lite', 'Python', 'Leaflet JS', 'Twilio / SMS Gateway', 'Node.js'],
    ctaText: 'EXPLORE AGRICTECH →',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'web3',
    name: 'WEB3',
    icon: Layers,
    emoji: '',
    shortDesc: 'Build systems based on transparency, ownership and decentralized trust.',
    fullDesc: 'Leveraging blockchain technology for tamper-proof credentials, digital identity verification, decentralized finance, and peer-to-peer asset transfer across borders.',
    color: '#B78CFF',
    borderColor: 'rgba(183, 140, 255, 0.4)',
    lightBg: 'rgba(183, 140, 255, 0.08)',
    buildAround: [
      'Digital identity',
      'Decentralized systems',
      'Asset tokenization',
      'Transparent transactions',
      'Digital ownership',
    ],
    sampleProblems: [
      'On-chain university degree & academic record verification system preventing fake credentials.',
      'DeFi remittance rails tailored for inter-African commerce.',
      'Decentralized land registry proof-of-ownership protocol.',
    ],
    recommendedTools: ['Solidity', 'Ethers.js / Viem', 'Polygon', 'Base', 'IPFS', 'Next.js'],
    ctaText: 'EXPLORE WEB3 →',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ai',
    name: 'AI & SOFTWARE',
    icon: Cpu,
    emoji: '',
    shortDesc: 'Use artificial intelligence to automate, predict and solve.',
    fullDesc: 'Harnessing Large Language Models, voice AI in local Nigerian languages (Yoruba, Hausa, Igbo, Pidgin), and intelligent automation for everyday business workflows.',
    color: '#F451D7',
    borderColor: 'rgba(244, 81, 215, 0.4)',
    lightBg: 'rgba(244, 81, 215, 0.08)',
    buildAround: [
      'AI agents',
      'Automation',
      'Local-language AI',
      'Intelligent applications',
      'Productivity',
      'Business solutions',
    ],
    sampleProblems: [
      'Yoruba/Pidgin voice-activated inventory assistant for informal market sellers.',
      'Automated legal document parser & contract advisor for Nigerian SMEs.',
      'AI customer support agent integrating WhatsApp Business for local logistics.',
    ],
    recommendedTools: ['Gemini API', 'OpenAI API', 'LangChain', 'Python', 'FastAPI', 'Vite React'],
    ctaText: 'EXPLORE AI →',
    imageUrl: '/ai&software.png',
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { stepNumber: '01', title: 'APPLICATION', description: 'Teams submit project proposals & builder profiles.' },
  { stepNumber: '02', title: 'TEAM SELECTION', description: 'Top 15 finalist teams selected through rigorous screening.' },
  { stepNumber: '03', title: 'BUILDER CLINIC', description: 'Opening keynote, sponsor briefs, & mentor alignment.' },
  { stepNumber: '04', title: 'BUILD SPRINT', description: '48 hours of intense coding, design, and prototyping.' },
  { stepNumber: '05', title: 'MENTORSHIP', description: '1-on-1 feedback rounds with industry experts.' },
  { stepNumber: '06', title: 'DEMO', description: 'Live product testing and technical verification.' },
  { stepNumber: '07', title: 'FINAL PITCH', description: 'Final stage presentations to judges and VC sponsors.' },
  { stepNumber: '08', title: 'AWARDS', description: 'Prize distribution, champion announcement & networking.' },
];

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    dayTitle: 'DAY 01 — BUILD',
    subTitle: 'Builder Clinic & Development Sprint',
    activities: [
      { time: '09:00 AM', title: 'Opening Keynote', description: 'Welcome address by OTC Leads & University dignitaries.' },
      { time: '10:15 AM', title: 'Sponsor Challenge Briefs', description: 'Unveiling track specifics, APIs, and grand prize criteria.' },
      { time: '11:00 AM', title: 'Team Onboarding', description: 'Workspace allocation, Wi-Fi credentials, and swag distribution.' },
      { time: '12:00 PM', title: 'Technical Planning', description: 'Architecture reviews and Git repository initializations.' },
      { time: '02:00 PM', title: 'Mentor Clinics Round 1', description: 'Technical mentors review system diagrams & stack choices.' },
      { time: '04:00 PM', title: 'Development Sprint', description: 'Continuous build mode begins across all 4 tracks.' },
      { time: '09:00 PM', title: 'Overnight Building', description: 'Power infrastructure, caffeine, energy drinks, and midnight snacks.' },
    ],
  },
  {
    dayTitle: 'DAY 02 — SHIP',
    subTitle: 'Demo, Pitch & Awards Ceremony',
    activities: [
      { time: '08:00 AM', title: 'Product Testing', description: 'Internal alpha testing and user flow validation.' },
      { time: '11:00 AM', title: 'Final Polish', description: 'UI refinements, slide deck finalization, and pitch prep.' },
      { time: '01:00 PM', title: 'Pitch Rehearsals', description: 'Dry run with mentor coaches before live audience.' },
      { time: '02:30 PM', title: 'Live Demonstrations', description: 'Top 15 finalist teams present 3-min live working demos.' },
      { time: '04:30 PM', title: 'Final Judging', description: 'Deliberation panel computes scores based on innovation & impact.' },
      { time: '05:30 PM', title: 'Awards Ceremony', description: 'Track Champions & Grand Champion announcement.' },
      { time: '06:30 PM', title: 'Networking & After-Party', description: 'Connect with sponsors, VCs, and fellow student builders.' },
    ],
  },
];

export const BUILDER_PROFILES: BuilderProfile[] = [
  {
    id: 'deji-agboola-oyindamola',
    name: 'Deji-Agboola Oyindamola',
    role: 'Hackathon Program Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Orchestrating end-to-end hackathon program flow, timeline execution, and builder engagement.',
    avatarUrl: '/team-deji-agboola.jpg',
    skills: ['Program Management', 'Operations', 'Event Coordination'],
    badge: 'PROGRAM LEAD',
  },
  {
    id: 'aminat-olashile',
    name: 'Aminat Olashile',
    role: 'Host & Hackathon Program Co-Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Official event host and program co-lead ensuring vibrant stage presence and smooth operations.',
    avatarUrl: '/team-aminat-olashile.jpg',
    skills: ['Event Hosting', 'Program Operations', 'Community Engagement'],
    badge: 'HOST & CO-LEAD',
  },
  {
    id: 'mayokun',
    name: 'Mayokun Ademuwagun',
    role: 'Hackathon Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Pioneering university tech innovation at OOU. Passionate about empowering student developers to build software that solves real Nigerian problems.',
    avatarUrl: '/Mayokun-Ademuwagun.jpg',
    skills: ['Product Strategy', 'Community Leadership', 'Fullstack Dev'],
    badge: 'LEAD ORGANIZER',
  },
  {
    id: 'usman-joseph',
    name: 'Usman Joseph',
    role: 'Visual Experience Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Crafting brand aesthetics, visual identity, and high-impact physical & digital design experiences for Builders Arena 2026.',
    avatarUrl: '/usman-joseph.jpg',
    skills: ['Visual Design', 'Brand Identity', 'UI/UX', 'Creative Direction'],
    badge: 'VISUAL LEAD',
  },
  {
    id: 'sanusi-quadri',
    name: 'Sanusi Quadri',
    role: 'Partnership Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Driving strategic partnerships and ecosystem sponsorships to power Builders Arena 2026.',
    avatarUrl: '/team-sanusi-quadri.jpg',
    skills: ['Partnerships', 'Sponsorship Relations', 'Strategy'],
    badge: 'PARTNERSHIP LEAD',
  },
  {
    id: 'haneefah-adegunle',
    name: 'Haneefah Adegunle',
    role: 'Volunteers Lead',
    category: 'lead',
    organization: 'OOU Tech Community',
    bio: 'Coordinating student volunteers, registration check-ins, and logistics for Builders Arena 2026.',
    avatarUrl: '/team-haneefah-adegunle.jpg',
    skills: ['Volunteer Coordination', 'Event Logistics', 'Community Support'],
    badge: 'VOLUNTEERS LEAD',
  },
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: 'SILVER',
    price: '₦200K',
    subtitle: 'Great for emerging tech brands',
    benefits: [
      'Logo on event materials & website',
      'Event mentions during keynotes',
      'Social media visibility across OTC channels',
      'Welcome-kit swag branding',
      'Post-event impact report & summary',
    ],
    cta: 'BECOME A SILVER SPONSOR',
    ctaClass: 'border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-black',
  },
  {
    name: 'GOLD',
    price: '₦400K',
    subtitle: 'Everything in Silver, plus:',
    isPopular: true,
    benefits: [
      'Everything in Silver tier',
      'Prominent high-visibility branding',
      'Special named category award presentation',
      'Mentor participation seat (1 slot)',
      'Exhibition booth space in hall',
      'Access to student project directory',
    ],
    cta: 'BECOME A GOLD SPONSOR',
    ctaClass: 'bg-brand-primary text-white hover:bg-brand-electric box-glow-purple',
  },
  {
    name: 'PLATINUM',
    price: '₦800K',
    subtitle: 'Everything in Gold, plus:',
    benefits: [
      'Everything in Gold tier',
      'Exclusive Track Ownership (e.g. Fintech Track)',
      'Track Award presentation on main stage',
      'Custom challenge brief co-creation',
      'Dedicated 45-min developer workshop',
      'Final judging panel seat',
      'Direct track-specific builder recruitment access',
    ],
    cta: 'OWN A TRACK',
    ctaClass: 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-black',
  },
  {
    name: 'TITLE SPONSOR',
    price: '₦1.5M',
    subtitle: 'Flagship Partner — BUILDERS ARENA 2026 POWERED BY [YOUR BRAND]',
    isTitle: true,
    benefits: [
      'Headline sponsorship across all event branding',
      'Opening Keynote address slot on main stage',
      'Grand Champion Award naming rights & trophy',
      'Hackathon challenge co-definition & API integration',
      '2 seats on Final Judging Panel',
      '2 dedicated Technical Mentors in hall',
      'Premium central exhibition & networking position',
      'Priority access to all top 15 finalist teams & code repos',
      'Full GitHub repositories & developer portfolios access',
    ],
    cta: 'BECOME TITLE SPONSOR',
    ctaClass: 'bg-gradient-to-r from-brand-yellow via-brand-cyan to-brand-pink text-brand-black font-extrabold shadow-xl hover:scale-105 transition-transform',
  },
];

export const IN_KIND_PARTNERS = [
  {
    icon: Wifi,
    title: 'CONNECTIVITY PARTNER',
    detail: '5G routers + uncapped Wi-Fi infrastructure for 75+ active builder laptops.',
    color: '#00D9FF',
  },
  {
    icon: Zap,
    title: 'ENERGY PARTNER',
    detail: 'Uninterrupted power supply & generator backup system for 48 continuous hours.',
    color: '#FFB800',
  },
  {
    icon: Package,
    title: 'HARDWARE & SWAG',
    detail: 'T-shirts, power banks, earbuds, mechanical keyboards, and builder gear.',
    color: '#F451D7',
  },
  {
    icon: Video,
    title: 'MEDIA PARTNER',
    detail: 'HD photography, live YouTube streaming, press coverage, and docu-video production.',
    color: '#B78CFF',
  },
];

export const NUMBERS_METRICS = [
  { count: '2,400+', label: 'REGISTRATIONS' },
  { count: '15', label: 'FINALIST TEAMS' },
  { count: '75', label: 'BUILDERS' },
  { count: '4', label: 'TRACKS' },
  { count: '48', label: 'HOURS' },
  { count: '1', label: 'MISSION' },
];

export const FINALIST_TEAMS_GRID: FinalistTeam[] = Array.from({ length: 15 }, (_, i) => ({
  id: `team-${i + 1}`,
  teamCode: `TEAM ${String(i + 1).padStart(2, '0')}`,
  name: i === 0 ? 'PaySphere OOU' : i === 1 ? 'AgriPulse' : i === 2 ? 'DeFiIdentity' : i === 3 ? 'YorubaVoice AI' : `Builder Squad ${i + 1}`,
  track: i % 4 === 0 ? 'FINTECH' : i % 4 === 1 ? 'AGRICTECH' : i % 4 === 2 ? 'WEB3' : 'AI & SOFTWARE',
  membersCount: 5,
  status: 'Selected',
}));

export const FAQS = [
  {
    q: 'Who can apply to Builders Arena 2026?',
    a: 'Builders Arena is open to undergraduate and post-graduate students at Olabisi Onabanjo University (OOU) as well as invited tertiary institutions across Nigeria. Developers, designers, product managers, and business strategists are welcome.',
  },
  {
    q: 'What is the team size requirement?',
    a: 'Teams must consist of maximum 5 builders (minimum 2). You can register with an existing team or find teammates during our pre-event team matching sessions.',
  },
  {
    q: 'Is the event physical or virtual?',
    a: 'It is a 48-hour physical hackathon hosted at the main campus of Olabisi Onabanjo University, Ago-Iwoye, Ogun State, Nigeria.',
  },
  {
    q: 'What does participation cost?',
    a: 'Participation is 100% FREE for all selected finalist teams! Meals, snacks, high-speed Wi-Fi, workspace, and swag are provided.',
  },
  {
    q: 'What support will sponsors receive?',
    a: 'Sponsors get direct access to top technical talent, opportunity to demo APIs/SDKs to builders, dedicated exhibition space, and prominent brand visibility across student tech communities.',
  },
];
