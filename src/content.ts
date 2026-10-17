// Everything personal lives here — edit this file, not the layout.
export const PROFILE = {
  name: 'Gauri',
  github: 'https://github.com/Gauri210',
  linkedin: 'https://www.linkedin.com/in/gauri-deshmukh21',
  email: 'gaurideshmukh.in@gmail.com', 
  resume: '', // e.g. '/resume.pdf' (drop the file in /public) — hidden while empty
};

export type Art = 'akshar' | 'finlens' | 'pcos' | 'groupthink' | 'macro-var' | 'checks' | 'cnn' | 'map' | 'forecast' | 'churn';

export interface Project {
  id: string;
  art: Art;
  category: string;
  title: string;
  description: string;
  detail: string;
  tools: string[];
  href?: string;
  stamp: string;
  postmark: string;
  dispatchNote: string;
}

export const projects: Project[] = [
  {
    id: '01',
    art: 'akshar',
    category: 'LIVE CANVAS · IN PROGRESS',
    title: 'Akshar',
    description: 'A live drawing canvas that recognises characters of the Modi script.',
    detail: 'Modi is the script historically used to write Marathi across Maharashtra. Akshar is an ongoing project to digitize and recognize its alphabet as you draw strokes on canvas. Dataset benchmarking and model training currently in progress.',
    tools: ['In progress', 'Computer Vision', 'Canvas API'],
    href: 'https://github.com/Gauri210/Akshar',
    stamp: 'MODI SCRIPT',
    postmark: 'MUMBAI · 2026',
    dispatchNote: 'ARCHIVAL FIELDWORK / ACTIVE BENCHMARK',
  },
  {
    id: '02',
    art: 'finlens',
    category: 'FINANCE · RAG',
    title: 'FinLens',
    description: 'A RAG tool that reads financial documents such as 10-Ks and earnings transcripts and answers questions about them.',
    detail: 'Upload a report and ask in plain English. FinLens returns summaries, key metrics, risks and disclosure gaps, using FAISS for the uploaded document and Pinecone for a persistent knowledge base, orchestrated with LangGraph.',
    tools: ['Python', 'LangGraph', 'FAISS', 'Pinecone', 'Streamlit'],
    href: 'https://github.com/Gauri210/FinLens',
    stamp: '10-K RAG',
    postmark: 'SEC EDGAR · 2026',
    dispatchNote: 'RETRIEVAL ACCURACY: TOP-3 CHUNKS',
  },
  {
    id: '03',
    art: 'pcos',
    category: 'DEEP LEARNING · CLASSIFICATION',
    title: 'PCOS Detection',
    description: 'A CNN versus a Naive Bayes baseline for detecting PCOS from ovarian ultrasound images.',
    detail: 'Four convolutional blocks with batch normalisation and dropout, compared against a Gaussian Naive Bayes baseline. On the test set the CNN reached 78.8% accuracy and 99.0% recall, against 61.2% and 54.7% for Naive Bayes.',
    tools: ['Python', 'TensorFlow', 'CNN', 'Naive Bayes'],
    href: 'https://github.com/Gauri210/PCOS-Detection-CNN-vs-Naives-Bayes',
    stamp: 'GRAD-CAM',
    postmark: 'BIOMEDICAL · 2026',
    dispatchNote: 'CNN 99.0% RECALL VS NB 54.7%',
  },
  {
    id: '04',
    art: 'groupthink',
    category: 'MULTI-AGENT LLMS · EXPERIMENT',
    title: 'Groupthink in Multi-Agent Systems',
    description: 'Do LLM agents drop a correct answer to match the group? An Asch-style experiment on AI conformity.',
    detail: 'Three conditions (solo, group deliberation and group with a contrarian agent) run as LangGraph workflows on 50 questions. Group deliberation matched solo accuracy at 76%, while peer exposure made agents revise correct answers 10% of the time. The sample is small, so the results are descriptive, not statistically significant.',
    tools: ['Python', 'LangGraph', 'Ollama', 'Streamlit'],
    href: 'https://github.com/Gauri210/Groupthink-in-MAS',
    stamp: 'ASCH TEST',
    postmark: 'LANGGRAPH · 2026',
    dispatchNote: 'AI CONFORMITY: 10% DRIFT OBSERVED',
  },
  {
    id: '05',
    art: 'macro-var',
    category: 'TIME SERIES · FINANCE',
    title: 'USD/INR, Gold and Crude Study',
    description: 'A time-series study of whether USD/INR movements help forecast gold and crude oil prices.',
    detail: 'Compares ARIMA with VAR models on daily data from 2019, after stationarity tests and log transforms. VAR beat ARIMA on out-of-sample RMSE for all three series over a 60-day holdout. ',
    tools: ['Python', 'statsmodels', 'pmdarima', 'pandas'],
    href: 'https://github.com/Gauri210/USDINR-Gold-Crude-A-Macro-FX-Time-Series-Study',
    stamp: 'VAR MODEL',
    postmark: 'MACRO-FX · 2026',
    dispatchNote: '60-DAY OUT-OF-SAMPLE RMSE LEAD',
  },
];

export const experience = [
  { when: '2026', title: 'Data Science Intern · VedSur Marketing Services Pvt. Ltd.', text: 'Developed and maintained data processing pipelines for survey data analysis.' },
  { when: '2026', title: 'Data Science Intern · NIS Consultants', text: 'Benchmarked OCR pipelines: classical ML against multimodal LLM approaches.' },
  { when: '2028', title: 'B.Tech Data Science · NMIMS MPSTME, Mumbai', text: 'Third year; graduating 2028. Current CGPA: 8.73/10' },
];

export const skills = ['Python', 'SQL', 'scikit-learn', 'Pandas', 'NumPy', 'TensorFlow', 'Git', 'Power BI', 'AWS', 'Docker'];
export const interests = ['murder mysteries 🔎','puzzles 🧩', 'painting 🎨'];
