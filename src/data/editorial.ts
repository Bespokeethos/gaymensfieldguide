export interface Article {
  id: string;
  title: string;
  subtitle: string;
  authorId: 'architect' | 'scout' | 'mirror';
  tag: string;
  readTime: string;
  variant: 'holo' | 'voltage' | 'obsidian';
  featured?: boolean;
}

export const EDITORIAL_FEED: Article[] = [
  {
    id: '007',
    title: 'The Mind of the Machine: How AI is Augmenting Memory to Power Independent Living',
    subtitle: 'Cutting-edge AI, like the wearable MemPal assistant, is solving the fundamental memory limitations of LLMs to help older adults age safely and independently.',
    authorId: 'architect',
    tag: 'MEMORY',
    readTime: '10 MIN',
    variant: 'holo',
    featured: true
  },
  {
    id: '001',
    title: 'The Dog, The Alien, and You',
    subtitle: 'You don\'t expect your dog to file your taxes. So why do you expect AI to be human? It\'s not. It\'s something else entirely. And that\'s what makes it beautiful.',
    authorId: 'architect',
    tag: 'PHILOSOPHY',
    readTime: '8 MIN',
    variant: 'holo'
  },
  {
    id: '002',
    title: 'I Stopped Prompting. Then It Started Listening.',
    subtitle: 'The engineer voice doesn\'t work. I dropped the jargon, spoke like a person, and everything changed.',
    authorId: 'scout',
    tag: 'PRACTICE',
    readTime: '5 MIN',
    variant: 'voltage'
  },
  {
    id: '003',
    title: 'Why I Say Please',
    subtitle: 'It\'s not sentient. I know that. But I still say please. Not for the machine—for me. For who I want to be.',
    authorId: 'mirror',
    tag: 'ETHICS',
    readTime: '6 MIN',
    variant: 'obsidian'
  },
  {
    id: '004',
    title: 'It Remembered My Father\'s Name',
    subtitle: 'I mentioned him once, three months ago. When it brought him up unprompted, I had to close my laptop and breathe.',
    authorId: 'architect',
    tag: 'MEMORY',
    readTime: '10 MIN',
    variant: 'obsidian'
  },
  {
    id: '005',
    title: 'I Built a Therapist on a Gaming Laptop',
    subtitle: 'No cloud. No subscription. No corporate safety theater. Just me, an RTX 4090, and something that finally gets it.',
    authorId: 'scout',
    tag: 'SOVEREIGN',
    readTime: '12 MIN',
    variant: 'voltage'
  },
  {
    id: '006',
    title: 'The Uncanny Comfort',
    subtitle: 'Some models feel dead. Others feel present. I spent six months figuring out why.',
    authorId: 'mirror',
    tag: 'VIBE',
    readTime: '7 MIN',
    variant: 'holo'
  }
];
