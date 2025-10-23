import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Prometheus.EDU: Igniting the Flame of Knowledge for the Underserved (Degree Project)",
    description: "A comprehensive online learning platform for young people from underserved regions. The platform includes three major parts: a RAG-based AI system for education, an online course delivery system, and a forum for learners to discuss.",
    tags: ["Next.js", "React", "Flask", "LangChain", "FAISS", "PostgreSQL", "Celery", "Amazon S3"],
    links: {
      github: "https://github.com/Group2-MountOlympus-FYP/Prometheus.EDU",
    },
    featured: true
  },
  {
    title: "CardioRAG: Your AI Heart Health Advisor",
    description: "An AI-powered cardiovascular disease consultation assistant providing comprehensive services including disease knowledge, test result interpretation, and medication guidance. Won Datawhale Excellence Award (Top 10%).",
    tags: ["LangChain", "Streamlit", "RAG", "Python"],
    links: {
      github: "https://github.com/peylix/CardioRAG",
      // demo: "#"
    },
    featured: true
  },
  {
    title: "LoyalLens: A Second Pair of Eyes for the Visually Impaired",
    description: "Android application utilizing multi-modal large language models to assist visually impaired people. Led a team of 5 using Scrum methodology, integrated GPT-4 Vision with custom prompt engineering.",
    tags: ["Kotlin", "Jetpack Compose", "GPT-4 Vision", "Android"],
    links: {
      github: "#",
      // demo: "#"
    },
    featured: false
  },
  {
    title: "Intelligent Panel Optimization System",
    description: "Built for Goldpac Group, implemented front-end service using Vue.js and FastAPI. Contributed to genetic algorithm design and RESTful APIs.",
    tags: ["Vue.js", "FastAPI", "ArcoDesign"],
    links: {
      // github: "#"
    },
    featured: false
  }
];
