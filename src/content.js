// All site copy lives here.
// Wrap a word in *asterisks* to render it in the bold accent style.

export const site = {
  name: 'Yug Dhawan',
  role: 'Backend & AI',
  heroLines: ['shipping', '*backends*', 'and', '*AI*', 'features'],
  email: 'dhawanyug4@gmail.com',
  emailNote: 'A paragraph about what you are building is enough',
  resume: 'assets/Yug_Dhawan_Resume.pdf',
  resumeNote: 'One page, PDF',
}

export const about = {
  label: 'About me',
  lines: [
    'I add *LLM features* to',
    'products that already exist',
    'and make the backend',
    'under them *fast*.',
  ],
}

export const skills = [
  { title: 'Backend', desc: 'Go, Node.js and C++. A dependency-free C++ server doing 665,000 requests a second.' },
  { title: 'AI features', desc: 'RAG, vector search and LLM pipelines that only call the model when they have to.' },
  { title: 'ML', desc: 'Multimodal models over images and text. Top 10% of 7,000+ teams at Amazon ML 2025.' },
  { title: 'Evaluation', desc: 'Scoring models against known answers, so you know whether they actually work.' },
]

export const experience = {
  label: 'Experience',
  lines: ['Shipping things *real*', 'people use, since school', 'in 2022'],
}

// `alt` is what appears when the row is hovered.
export const history = [
  { year: 'Now', role: 'SDE Intern', alt: 'Built the CRM 50+ agents use daily', company: 'Agnayi Infra Resources' },
  { year: '2027', role: 'B.Tech, ECE', alt: 'Final year, New Delhi', company: 'MAIT' },
  { year: '2025', role: 'Amazon ML Challenge', alt: 'Top 10% of 7,000+ teams', company: 'Two models in 30 hours' },
  { year: '2022', role: 'Protected', alt: '150+ servers, 320,000 users', company: 'Discord anti-raid bot' },
]

export const projects = {
  label: 'Projects',
  lines: ['Things I have built,', 'each with *something*', 'to watch or try'],
}

export const motto = {
  label: 'How I work',
  text: 'Show it working',
  credit: 'A short call, then a small fixed-price piece of work',
}

export const socials = [
  { name: 'GitHub', note: 'Code & benchmarks', href: 'https://github.com/coolboy-dev' },
  { name: 'LinkedIn', note: 'The serious version', href: 'https://linkedin.com/in/yug-dhawan' },
]
