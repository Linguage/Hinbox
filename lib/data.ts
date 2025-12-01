
export interface Email {
  id: string;
  sender: string;
  senderEmail?: string;
  subject: string;
  snippet: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  labels: string[]; // e.g., "Inbox", "Sent", "Michael Wolff"
  body?: string; // The actual blog post content
}

export interface Person {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

export const people: Person[] = [
  {
    id: 'mw',
    name: 'Michael Wolff',
    email: 'michael@example.com',
    bio: 'Journalist and author focused on politics and media narratives.',
  },
  {
    id: 'ls',
    name: 'Larry Summers',
    email: 'larry@example.com',
    bio: 'Economist and policy adviser frequently engaged in public debate.',
  },
  {
    id: 'sb',
    name: 'Steve Bannon',
    email: 'steve@example.com',
    bio: 'Media executive and political strategist involved in populist movements.',
  },
  {
    id: 'ks',
    name: 'Ken Starr',
    email: 'ken@example.com',
    bio: 'Lawyer and former judge known for work on high-profile investigations.',
  },
  {
    id: 'ji',
    name: 'Joi Ito',
    email: 'joi@example.com',
    bio: 'Technology investor and advocate for open, experimental innovation.',
  },
  {
    id: 'gm',
    name: 'Ghislaine Maxwell',
    email: 'ghislaine@example.com',
    bio: 'Socialite connected to networks across business, media, and philanthropy.',
  },
  {
    id: 'nc',
    name: 'Noam Chomsky',
    email: 'noam@example.com',
    bio: 'Linguist and social critic whose writings span language, politics, and history.',
  },
  {
    id: 'tp',
    name: 'Tom Pritzker',
    email: 'tom@example.com',
    bio: 'Business executive and philanthropist active in global initiatives.',
  },
  {
    id: 'ad',
    name: 'Alan Dershowitz',
    email: 'alan@example.com',
    bio: 'Lawyer and legal scholar known for high-profile public commentary.',
  },
  {
    id: 'as',
    name: 'Al Seckel',
    email: 'al@example.com',
    bio: 'Writer and presenter who popularized ideas about visual perception and illusions.',
  },
];

export const emails: Email[] = [
  {
    id: '1',
    sender: 'Steve Bannon',
    subject: 'Re: Announcing the 2019 Hillman Prize winners',
    snippet: 'Fix always in',
    date: 'Apr 23, 2019',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Inbox', 'Michael Wolff', 'Steve Bannon'],
    body: `
<p>Here is the inside story of what happened.</p>
<p>The fix was always in. It wasn't about the prize, it was about the message being sent to the establishment.</p>
<br>
<h3>The Backstory</h3>
<p>When we first looked at the candidates, it was clear that the criteria had shifted...</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    `
  },
  {
    id: '2',
    sender: 'The Sidney Hillman Foundation',
    subject: 'Announcing the 2019 Hillman Prize winners',
    snippet: 'Congratulations to the 2019 Hillman Prize recipients! Sidney Hillman',
    date: 'Apr 23, 2019',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Inbox', 'Michael Wolff']
  },
  {
    id: '3',
    sender: 'Michael Wolff',
    subject: 'Re: SB',
    snippet: 'I think his FT performance yesterday was quite a hit (btw, he reiterated that my book was all true)',
    date: 'Mar 23, 2018',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Sent', 'Michael Wolff', 'Steve Bannon']
  },
  {
    id: '4',
    sender: 'Michael Wolff',
    subject: 'Re:',
    snippet: 'My guess is that he will be too paranoid. He believes NYP photographers are following him. But will',
    date: 'Nov 29, 2016',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Sent', 'Michael Wolff']
  },
  {
    id: '5',
    sender: 'Michael Wolff',
    subject: 'Re: Trump',
    snippet: 'What was the letter?',
    date: 'May 25, 2016',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Sent', 'Michael Wolff']
  },
  {
    id: '6',
    sender: 'Michael Wolff',
    subject: 'Re: [Redacted]',
    snippet: "Is Clinton willing to say he was not there? Btw, I've just filed a column for USA Today for Monday",
    date: 'Jan 09, 2015',
    isRead: true,
    isStarred: true,
    hasAttachment: true,
    labels: ['Sent', 'Michael Wolff']
  },
  {
    id: '7',
    sender: 'J',
    subject: 'Fwd:',
    snippet: 'have fun',
    date: 'Feb 01, 2019',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Inbox', 'Michael Wolff', 'Joi Ito']
  },
  {
    id: '8',
    sender: 'Jeffrey E.',
    subject: 'boies',
    snippet: 'http://people.com/movies/harvey-weinstein-hired-intelligence-agencies-to-spy-on-accusers-rose-mcgowan',
    date: 'Nov 07, 2017',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Inbox', 'Michael Wolff', 'Jeffrey E.']
  },
  {
    id: '9',
    sender: 'Michael Wolff',
    subject: 'Re:',
    snippet: 'Ailes said he gave up trying to give advice, that Trump was the boy in pre-school who you just knew',
    date: 'Oct 21, 2016',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Sent', 'Michael Wolff']
  },
  {
    id: '10',
    sender: 'Jeffrey E.',
    subject: 'Re: thoughts',
    snippet: 'today ok. -- please note The information contained in this communication is confidential, may be attorney-client privileged',
    date: 'Jan 16, 2015',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Inbox', 'Michael Wolff', 'Jeffrey E.']
  }
];
