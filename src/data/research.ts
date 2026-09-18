import type { Research } from '../types';

export const research: Research[] = [
  {
    title: "UniWeather: Unified Continual and Multi-Domain All-in-One Weather Removal",
    role: "Research Assistant",
    organization: "Shenzhen Research Institute of Big Data (SRIBD), CUHK-Shenzhen",
    advisor: "Dr. Changmiao Wang",
    period: "Feb 2026 - Present",
    highlights: [
      "Co-worked on a single all-in-one adverse-weather removal architecture whose input-routed multi-expert LoRA adapters support both continual learning across weather types and multi-domain joint learning.",
      "Co-designed the experimental protocol and ran the experiments."
    ]
  },
  {
    title: "EmoSense: A Hybrid CNN-RAG Framework for FER-Based Mental Health Support",
    role: "Undergraduate Research Assistant",
    organization: "School of Computer Science, University College Dublin",
    advisor: "Dr. Soumyabrata Dev",
    period: "Dec 2024 - Nov 2025",
    highlights: [
      "Designed and implemented the RAG module that turns CNN-based facial-emotion predictions into personalized mental-health reports; added LLM-based preprocessing to improve retrieval and generation quality.",
      "Designed and analyzed the user-evaluation survey; wrote and revised sections of the paper (AICS 2025, second author)."
    ]
  },
  {
    title: "DLibFuzz: LLM-Driven Fuzz Testing for Deep-Learning Libraries",
    role: "Undergraduate Research Assistant",
    organization: "College of Computer Science, Beijing University of Technology",
    advisor: "Dr. Qing Mi",
    period: "Jan 2024 - Aug 2025",
    highlights: [
      "Co-designed an LLM-driven fuzzing framework for API-level testing of PyTorch, JAX, Jittor, and MindSpore; introduced retrieval-augmented generation for API-context retrieval, improving test-generation accuracy and lowering deployment cost.",
      "Implemented the pipeline architecture and its components for error-triggering data collection, automatic labeling, seed validation, test-oracle design, and differential testing."
    ]
  }
];
