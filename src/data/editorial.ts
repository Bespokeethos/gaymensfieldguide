export interface Article {
  id: string;
  title: string;
  subtitle: string;
  authorId: 'architect' | 'scout' | 'mirror';
  tag: string;
  readTime: string;
  variant: 'holo' | 'voltage' | 'obsidian';
  featured?: boolean;
  gridArea?: 'large' | 'tall' | 'wide' | 'standard'; 
  slug: string;
  date: string;
  image: string; // Added image field
}

export const EDITORIAL_FEED: Article[] = [
  {
    id: '000-GARLIC',
    title: 'OpenAI Announced GPT-5.2 (Garlic)',
    subtitle: 'Internal codename "Garlic". It remembers more, works smarter, and uses a whole team of experts.',
    authorId: 'architect',
    tag: 'COVER_STORY',
    readTime: '15 MIN',
    variant: 'voltage',
    featured: true,
    gridArea: 'large',
    slug: 'openai-gpt-5-2-garlic',
    date: '2025-10-15',
    image: '/images/blog/moe-timeline.png'
  },
  {
    id: '001',
    title: 'The Dead Internet Theory is Real',
    subtitle: '90% of traffic is bots. You might be one of them.',
    authorId: 'architect',
    tag: 'PHILOSOPHY',
    readTime: '8 MIN',
    variant: 'holo',
    gridArea: 'wide',
    slug: 'dead-internet-theory',
    date: '2025-10-12',
    image: '/images/blog/dead-internet-thumb.png'
  },
  {
    id: '002',
    title: 'Smart Fridge Scam',
    subtitle: 'Why your toaster needs WiFi and is mining crypto.',
    authorId: 'scout',
    tag: 'SECURITY',
    readTime: '5 MIN',
    variant: 'voltage',
    gridArea: 'standard',
    slug: 'smart-fridge-scam',
    date: '2025-10-10',
    image: '/images/blog/smart-fridge-thumb.png'
  },
  {
    id: '003-RIG',
    title: 'God-Tier Local LLM Rig',
    subtitle: 'Dual 3090s or bust. VRAM is the only currency.',
    authorId: 'architect',
    tag: 'HARDWARE',
    readTime: '12 MIN',
    variant: 'obsidian',
    slug: 'god-tier-local-llm-rig',
    date: '2025-10-08',
    image: '/images/blog/gpu-rig-thumb.png'
  },
  {
    id: '004-RABBIT',
    title: 'Rabbit R1: E-Waste Speedrun',
    subtitle: 'How to launch a product that does nothing faster than your phone.',
    authorId: 'scout',
    tag: 'REVIEW',
    readTime: '6 MIN',
    variant: 'voltage',
    slug: 'rabbit-r1-e-waste',
    date: '2025-10-05',
    image: '/images/blog/rabbit-r1-thumb.png'
  },
  {
    id: '005-POISON',
    title: 'Nightshade Data Poisoning',
    subtitle: 'Artists are fighting back. The pixels are fighting back.',
    authorId: 'mirror',
    tag: 'ART',
    readTime: '10 MIN',
    variant: 'holo',
    slug: 'nightshade-data-poisoning',
    date: '2025-10-01',
    image: '/images/blog/nightshade-thumb.png'
  },
  {
    id: '006-FINGER',
    title: 'Browser Fingerprinting 2025',
    subtitle: 'Incognito mode is a lie. They know who you are by your font list.',
    authorId: 'architect',
    tag: 'PRIVACY',
    readTime: '8 MIN',
    variant: 'obsidian',
    slug: 'browser-fingerprinting-2025',
    date: '2025-09-28',
    image: '/images/blog/fingerprint-thumb.png'
  },
  {
    id: '007-FLIPPER',
    title: 'Flipper Zero Agents',
    subtitle: 'The Tamagotchi that opens Tesla charging ports.',
    authorId: 'scout',
    tag: 'HACKING',
    readTime: '7 MIN',
    variant: 'voltage',
    slug: 'flipper-zero-agents',
    date: '2025-09-25',
    image: '/images/blog/flipper-thumb.png'
  },
  {
    id: '008-MESH',
    title: 'ApocalyseNet: Meshtastic',
    subtitle: 'When the internet dies, the LoRa network survives.',
    authorId: 'architect',
    tag: 'SURVIVAL',
    readTime: '11 MIN',
    variant: 'obsidian',
    slug: 'apocalyspenet-meshtastic',
    date: '2025-09-20',
    image: '/images/blog/meshtastic-thumb.png'
  },
  {
    id: '009-JARVIS',
    title: 'Building JARVIS Local',
    subtitle: 'Open Source home automation with actual intelligence.',
    authorId: 'scout',
    tag: 'BUILD',
    readTime: '9 MIN',
    variant: 'voltage',
    slug: 'building-jarvis-local',
    date: '2025-09-18',
    image: '/images/blog/local-llm-thumb.png'
  },
  {
    id: '010-CURSOR',
    title: 'Cursor vs Windsurf',
    subtitle: 'The IDE Civil War. Which AI co-pilot actually codes?',
    authorId: 'mirror',
    tag: 'TOOLS',
    readTime: '8 MIN',
    variant: 'holo',
    slug: 'cursor-vs-windsurf',
    date: '2025-09-15',
    image: '/images/blog/cursor-vs-windsurf-thumb.png'
  },
  {
    id: '011-DARK',
    title: 'Dark Patterns 2025',
    subtitle: 'How UI is designed to trick you into spending.',
    authorId: 'architect',
    tag: 'DESIGN',
    readTime: '6 MIN',
    variant: 'obsidian',
    slug: 'dark-patterns-2025',
    date: '2025-09-12',
    image: '/images/blog/dark-patterns-thumb.png'
  },
  {
    id: '012-HOARD',
    title: 'Digital Hoarding (NAS)',
    subtitle: 'Why I keep 40TB of data I will never look at.',
    authorId: 'scout',
    tag: 'DATA',
    readTime: '7 MIN',
    variant: 'voltage',
    slug: 'digital-hoarding-nas',
    date: '2025-09-10',
    image: '/images/blog/nas-thumb.png'
  },
  {
    id: '013-DEPIN',
    title: 'Hivemapper: DePin Casino',
    subtitle: 'Drive your car, earn tokens, lose money.',
    authorId: 'architect',
    tag: 'CRYPTO',
    readTime: '10 MIN',
    variant: 'holo',
    slug: 'hivemapper-depin-casino',
    date: '2025-09-08',
    image: '/images/blog/hivemapper-thumb.png'
  },
  {
    id: '014-MAC',
    title: 'Why Your Mac Studio is a Paperweight',
    subtitle: 'Apple Silicon for AI? Think again.',
    authorId: 'scout',
    tag: 'HARDWARE',
    readTime: '8 MIN',
    variant: 'obsidian',
    slug: 'mac-studio-paperweight',
    date: '2025-09-05',
    image: '/images/blog/mac-studio-thumb.png'
  },
  {
    id: '015-SAAS',
    title: 'The Post-SaaS Era',
    subtitle: 'Why pay monthly when you can run it locally?',
    authorId: 'mirror',
    tag: 'INDUSTRY',
    readTime: '9 MIN',
    variant: 'voltage',
    slug: 'post-saas-era',
    date: '2025-09-02',
    image: '/images/blog/saas-thumb.png'
  },
  {
    id: '016-PROMPT',
    title: 'Prompt Injection 101',
    subtitle: 'How to make an LLM reveal its instructions.',
    authorId: 'architect',
    tag: 'SECURITY',
    readTime: '12 MIN',
    variant: 'holo',
    slug: 'prompt-injection-101',
    date: '2025-08-30',
    image: '/images/blog/prompt-injection-thumb.png'
  },
  {
    id: '017-PI',
    title: 'Raspberry Pi AI Cluster',
    subtitle: 'It is slow, it is useless, and it is beautiful.',
    authorId: 'scout',
    tag: 'BUILD',
    readTime: '10 MIN',
    variant: 'obsidian',
    slug: 'raspberry-pi-ai-cluster',
    date: '2025-08-28',
    image: '/images/blog/pi-cluster-thumb.png'
  },
  {
    id: '018-OPEN',
    title: 'Sleeping Giants: Open Source',
    subtitle: 'The corporate models are plateauing. Llama is catching up.',
    authorId: 'mirror',
    tag: 'OPEN_SOURCE',
    readTime: '7 MIN',
    variant: 'voltage',
    slug: 'sleeping-giants-opensource',
    date: '2025-08-25',
    image: '/images/blog/opensource-thumb.png'
  },
  {
    id: '019-SOLAR',
    title: 'Solarpunk 2025',
    subtitle: 'High tech, green life. The aesthetic of survival.',
    authorId: 'architect',
    tag: 'AESTHETIC',
    readTime: '8 MIN',
    variant: 'holo',
    slug: 'solarpunk-2025',
    date: '2025-08-22',
    image: '/images/blog/solarpunk-thumb.png'
  },
  {
    id: '020-VIBE',
    title: 'Frequency of Vibe Coding',
    subtitle: '15 Evergreen Trends that define the lifestyle.',
    authorId: 'scout',
    tag: 'VIBE',
    readTime: '10 MIN',
    variant: 'voltage',
    slug: 'the-future-of-vibe-coding-and-15-evergreen-trends',
    date: '2025-08-20',
    image: '/images/blog/vibe-coding-thumb.png'
  },
  {
    id: '021-VOICE',
    title: 'Uncanny Valley Voice',
    subtitle: 'Why polite AI voices make my skin crawl.',
    authorId: 'mirror',
    tag: 'UX',
    readTime: '6 MIN',
    variant: 'obsidian',
    slug: 'uncanny-valley-voice',
    date: '2025-08-18',
    image: '/images/blog/uncanny-voice-thumb.png'
  }
];

