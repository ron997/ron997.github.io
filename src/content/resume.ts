/**
 * Every fact on the site, taken from "Rounak Burman - Resume.pdf".
 * Edit here; the components only lay it out.
 *
 * `metrics` are substrings of a bullet that get the highlighter.
 * `tools` are substrings set in bold (the resume bolds them too).
 */

export type Bullet = { text: string; metrics?: string[]; tools?: string[] }
export type Role = { id: string; title: string; dates: string; bullets: Bullet[] }
export type Org = { org: string; place: string; roles: Role[] }

export const person = {
  name: 'Rounak Burman',
  first: 'Rounak',
  last: 'Burman',
  role: 'Data Scientist and ML engineer',
  location: 'Kolkata, India',
  email: 'rounak42.rb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rounak-burman',
  linkedinLabel: 'linkedin.com/in/rounak-burman',
  github: 'https://github.com/ron997',
  githubLabel: 'github.com/ron997',
  resume: '/Rounak-Burman-Resume.pdf',
  now: 'Data Science Consultant, TCG Digital',
  studied: 'MS Computer Science, UMass Boston',
}

export const summaryShort =
  "Data Scientist and ML engineer with a Master's in Computer Science, specializing in computer vision, NLP, and LLM / agentic systems."

export const summary =
  "Data Scientist and ML engineer with a Master's in Computer Science, specializing in computer vision, NLP, and LLM / agentic systems. Skilled across the full ML lifecycle, from YOLO-based detection and OCR document intelligence to multi-agent workflows built with LangGraph and A2A, and in shipping them with Docker, Kubernetes, and AWS, consistently delivering models exceeding 90% accuracy."

/** Phrases in the summary that get the highlighter as they are read. */
export const summaryMarks = ['computer vision, NLP, and LLM / agentic systems.', 'shipping them', '90% accuracy.']

/** The hero's skill chips: one or two per area, kept to two rows. The full list is in `skills`. */
export const topSkills = ['LangGraph', 'A2A', 'RAG', 'YOLOv8', 'Docling', 'PyTorch', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Kubernetes']

export const skills: { key: string; values: string[] }[] = [
  { key: 'Programming', values: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  {
    key: 'ML & Computer Vision',
    values: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'YOLOv8', 'DeepSORT', 'Roboflow', 'pose estimation', 'keypoint detection'],
  },
  {
    key: 'LLM & GenAI',
    values: ['LangGraph', 'A2A', 'multi-agent orchestration', 'RAG', 'embeddings', 'LLM agents', 'Whisper API', 'IndicParler TTS', 'BERT', 'Gensim', 'Mistral OCR', 'Docling', 'TwelveLabs', 'NLP'],
  },
  { key: 'Data & Databases', values: ['PostgreSQL', 'MongoDB', 'Elasticsearch', 'SQL', 'Pandas', 'NumPy'] },
  { key: 'Web & Cloud', values: ['React', 'MUI', 'Flask API', 'Firebase', 'Postman', 'AWS', 'Docker', 'Kubernetes'] },
]

export const experience: Org[] = [
  {
    org: 'TCG Digital',
    place: 'Kolkata, India',
    roles: [
      {
        id: 'exp-data-science-consultant',
        title: 'Data Science Consultant',
        dates: 'Jul 2025 – Present',
        bullets: [
          {
            text: 'Architected a multi-agent saree-design tagging pipeline orchestrated with LangGraph, coordinating 5+ vision and LLM tools to extract visual features, auto-generate structured tags and embeddings, and persist design metadata to a MongoDB collection, cataloging 5,000+ saree designs and cutting manual tagging effort by 70%.',
            metrics: ['5,000+ saree designs', 'cutting manual tagging effort by 70%'],
            tools: ['LangGraph'],
          },
          {
            text: 'Built the orchestrator to also generate new saree designs, answer sales-data queries, generate visualizations, run trend research with illustrated PPT and PDF reports as output, and pick out and display designs from the internal catalogue, linked to sales data through the design ID.',
          },
          {
            text: 'Built a document-intelligence pipeline with Docling, applying OCR and vision models to make PDFs and scanned PDFs LLM-ready with over 95% extraction accuracy.',
            metrics: ['over 95% extraction accuracy'],
            tools: ['Docling'],
          },
          {
            text: 'Integrated the TwelveLabs video API to auto-generate timestamps of sports events from live video feeds with over 85% accuracy.',
            metrics: ['over 85% accuracy'],
            tools: ['TwelveLabs'],
          },
        ],
      },
      {
        id: 'exp-data-science-intern',
        title: 'Data Science Intern',
        dates: 'Sep 2024 – Jun 2025',
        bullets: [
          {
            text: 'Implemented computer vision and fine-tuned ML models for corrosion detection in metal pipelines with over 90% accuracy.',
            metrics: ['over 90% accuracy'],
          },
          {
            text: 'Detected litter and spillage in real-time footage using DeepSORT and YOLO with over 91% accuracy.',
            metrics: ['over 91% accuracy'],
          },
          {
            text: 'Translated soccer commentary from English to Hindi using the Whisper API and IndicParler TTS, and ran 3+ CV models (YOLOv8, YOLOv8x-pose) for pose estimation, keypoint detection, and object tracking.',
            metrics: ['3+ CV models'],
          },
          {
            text: 'Applied a Google BERT embedding model with custom field-weighting to deduplicate patient records across two tables into a master table with 95% accuracy.',
            metrics: ['95% accuracy'],
          },
          {
            text: 'Extracted and encoded pictogram data from two PDF versions and regenerated a merged PDF using Mistral OCR with over 98% accuracy.',
            metrics: ['over 98% accuracy'],
          },
        ],
      },
    ],
  },
  {
    org: 'University of Massachusetts, Boston',
    place: 'Boston, MA',
    roles: [
      {
        id: 'exp-project-assistant',
        title: 'Project Assistant, Full-Stack Development',
        dates: 'Feb 2024 – May 2024',
        bullets: [
          {
            text: 'Automated extraction and summarization of medical research articles in a web app using TensorFlow, Gensim, and BERT, increasing content accessibility for healthcare professionals by 25%.',
            metrics: ['increasing content accessibility for healthcare professionals by 25%'],
          },
          {
            text: 'Developed a PyQt5 desktop app for labeling VAS data, improving labeling accuracy by 15%.',
            metrics: ['improving labeling accuracy by 15%'],
          },
        ],
      },
    ],
  },
  {
    org: 'Lynchval Systems',
    place: 'Boston, MA',
    roles: [
      {
        id: 'exp-database-engineer-intern',
        title: 'Database Engineer Intern',
        dates: 'May 2023 – Jul 2023',
        bullets: [
          {
            text: 'Enhanced predictive analytics by optimizing SQL database queries, reducing data interval times by 15%.',
            metrics: ['reducing data interval times by 15%'],
          },
        ],
      },
    ],
  },
  {
    org: 'Curved Pixel LLP',
    place: 'Kolkata, India',
    roles: [
      {
        id: 'exp-full-stack-developer',
        title: 'Full-Stack Developer',
        dates: 'Dec 2020 – Jun 2022',
        bullets: [
          {
            text: 'Led development of 5+ dynamic web pages and 3 complex APIs using Python, React, JavaScript, HTML, CSS, MUI, and Flask, improving overall system efficiency and user engagement.',
            metrics: ['5+ dynamic web pages and 3 complex APIs'],
          },
          {
            text: 'Improved site response time by 20% through optimized JavaScript and CSS.',
            metrics: ['Improved site response time by 20%'],
          },
        ],
      },
    ],
  },
]

/** The measured results in the resume, each traced to the line it came from. */
export const results: { value: number; prefix?: string; suffix: string; what: string; how: string; source: string }[] = [
  { value: 98, prefix: '>', suffix: '%', what: 'accuracy extracting and merging pictogram data from two PDF versions', how: 'Mistral OCR', source: 'Extracted and encoded pictogram data' },
  { value: 95, prefix: '>', suffix: '%', what: 'extraction accuracy making PDFs and scanned PDFs LLM-ready', how: 'Docling · OCR · vision models', source: 'Built a document-intelligence pipeline' },
  { value: 95, suffix: '%', what: 'accuracy deduplicating patient records across two tables', how: 'BERT embeddings · field weighting', source: 'Applied a Google BERT embedding model' },
  { value: 91, prefix: '>', suffix: '%', what: 'accuracy detecting litter and spillage in real-time footage', how: 'YOLO · DeepSORT', source: 'Detected litter and spillage' },
  { value: 90, prefix: '>', suffix: '%', what: 'accuracy detecting corrosion in metal pipelines', how: 'computer vision · fine-tuned models', source: 'Implemented computer vision' },
  { value: 85, prefix: '>', suffix: '%', what: 'accuracy auto-generating timestamps of sports events from live video', how: 'TwelveLabs video API', source: 'Integrated the TwelveLabs' },
  { value: 5000, suffix: '+', what: 'saree designs catalogued by a multi-agent tagging pipeline', how: 'LangGraph · 5+ vision and LLM tools · MongoDB', source: 'Architected a multi-agent' },
  { value: 70, suffix: '%', what: 'less manual tagging effort on that catalogue', how: 'auto-generated tags and embeddings', source: 'Architected a multi-agent' },
]

export const projects: { name: string; text: string; tools: string[] }[] = [
  {
    name: 'Fletch Homes',
    text: 'A real estate web app built with a team of 3: 5+ back-end and 7+ front-end components.',
    tools: ['Flask', 'Firebase', 'Postman', 'AWS', 'Docker'],
  },
  {
    name: 'iConcern',
    text: 'Two types of topic modeling and caching with NLP over a MongoDB-backed web app.',
    tools: ['Gensim', 'BERT', 'MongoDB'],
  },
]

export const education: { degree: string; school: string; place: string; date: string }[] = [
  { degree: 'Master of Science, Computer Science', school: 'University of Massachusetts, Boston', place: 'Boston, MA', date: 'May 2024' },
  { degree: 'Bachelor of Technology, Information Technology', school: 'Kalyani University', place: 'West Bengal, India', date: 'Oct 2020' },
]
