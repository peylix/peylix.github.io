import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Semantic Retrieval for Scientific Documents",
    description: "Course project for ECE-GY 6143 Machine Learning at NYU. Compared a Word2Vec baseline, a pretrained sentence-transformer (all-MiniLM-L6-v2), and a supervised fine-tuned variant for scientific-document retrieval on SciFact (BEIR). Fine-tuned with MultipleNegativesRankingLoss and hard-negative mining; evaluated with Recall, MRR, and NDCG, where fine-tuning gave further gains over the pretrained model.",
    period: "Sep 2025 - Dec 2025",
    tags: ["Python", "PyTorch", "sentence-transformers", "BEIR", "Information Retrieval"],
    links: {
      github: "https://github.com/peylix/semantic-retrieval",
    },
    featured: true
  },
  {
    title: "Prometheus.EDU: Igniting the Flame of Knowledge for the Underserved (Final-Year Project)",
    description: "An AI-powered learning platform for underserved learners, built as my UCD final-year project under Prof. Catherine Mooney. As backend and AI engineer, I co-designed the RAG system for personalized tutoring, automatic assignment review, and learning-resource recommendation, plus a Ragas-based evaluation framework. Also built the backend APIs (vector store, video streaming) with unit tests and the CI/CD pipeline deploying to the UCD course server.",
    period: "Jan 2025 - May 2025",
    tags: ["Next.js", "React", "Flask", "LangChain", "FAISS", "PostgreSQL", "Celery", "Amazon S3", "Ragas"],
    links: {
      github: "https://github.com/Group2-MountOlympus-FYP/Prometheus.EDU",
    },
    featured: true
  },
  {
    title: "CardioRAG: Your AI Heart Health Advisor",
    description: "An AI-powered cardiovascular consultation assistant covering disease knowledge, test-result interpretation, and medication guidance. As team lead, I led a team of clinical-medicine and CS students, built the LangChain RAG pipeline, tuned prompts for clinical Q&A, and deployed it publicly. Won the Datawhale Excellence Award (Top 10%) and Third Prize.",
    period: "Aug 2024 - Sep 2024",
    tags: ["LangChain", "Streamlit", "RAG", "Python"],
    links: {
      github: "https://github.com/peylix/CardioRAG",
    },
    featured: true
  },
  {
    title: "LoyalLens: A Second Pair of Eyes for the Visually Impaired",
    description: "An Android assistive app built with a team of 5, using multi-modal large language models to help visually impaired users. Integrated GPT-4 Vision with custom prompt engineering and implemented object detection and speech recognition in Jetpack Compose.",
    period: "Dec 2023 - May 2024",
    tags: ["Kotlin", "Jetpack Compose", "GPT-4 Vision", "Android"],
    links: {},
    featured: false
  },
  {
    title: "Intelligent Panel Optimization System",
    description: "Built for Goldpac Group to automate card-layout arrangement. Implemented the Vue.js front end and FastAPI layer, and contributed to the genetic-algorithm optimizer and RESTful API design. The work led to a filed patent.",
    period: "Sep 2023 - Apr 2024",
    tags: ["Vue.js", "FastAPI", "ArcoDesign", "Genetic Algorithm"],
    links: {},
    featured: false
  }
];
