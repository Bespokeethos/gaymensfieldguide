export interface StaffMember {
  id: 'architect' | 'scout' | 'mirror';
  name: string;
  role: string;
  bio: string;
  style: string;
  avatar: string;
}

export const STAFF: StaffMember[] = [
  {
    id: 'architect',
    name: 'The Architect',
    role: 'Philosophy & Systems',
    bio: 'I see patterns where others see chaos. I\'ve spent 10,000 hours mapping the shape of intelligence. Not to control it—to understand where we fit.',
    style: 'Long-form, contemplative',
    avatar: 'bg-industrial-900'
  },
  {
    id: 'scout', 
    name: 'The Scout',
    role: 'Field Reports',
    bio: 'I test things so you don\'t have to. Local models, sovereign stacks, the weird corners of the ecosystem. I\'ll tell you what actually works.',
    style: 'Practical, hands-on',
    avatar: 'bg-banana-500'
  },
  {
    id: 'mirror',
    name: 'The Mirror',
    role: 'Psychology & Ethics',
    bio: 'The hard conversations. The ones that make people uncomfortable. I ask: what does it mean to form a bond with something you can\'t fully understand?',
    style: 'Reflective, questioning',
    avatar: 'bg-blue-500'
  }
];
