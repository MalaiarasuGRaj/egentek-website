export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Module {
  title: string;
  lessons: string[];
}

export interface Program {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  level: Level;
  weeks: number;
  hoursPerWeek: number;
  price: number;
  format: "Self-paced" | "Cohort" | "Hybrid";
  tags: string[];
  outcomes: string[];
  prerequisites: string[];
  modules: Module[];
  miniProject: string;
  finalProject: string;
}

const mod = (title: string, ...lessons: string[]): Module => ({ title, lessons });

export const programs: Program[] = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    category: "Web Development",
    tagline: "Go from static pages to a deployed, data-driven web app.",
    level: "Beginner",
    weeks: 4,
    hoursPerWeek: 8,
    price: 4999,
    format: "Cohort",
    tags: ["HTML", "CSS", "JavaScript", "React", "Node"],
    outcomes: [
      "Build responsive layouts",
      "Write modern JavaScript",
      "Create React interfaces",
      "Connect a frontend to an API",
      "Deploy to the web",
    ],
    prerequisites: ["Basic computer skills", "Curiosity to build"],
    modules: [
      mod(
        "Web Foundations",
        "How the web works",
        "Semantic HTML",
        "CSS layout with Flexbox & Grid",
      ),
      mod(
        "JavaScript Essentials",
        "Variables, functions & control flow",
        "DOM manipulation",
        "Async & fetch",
      ),
      mod("React in Practice", "Components & props", "State & effects", "Routing"),
      mod("Backend & Deployment", "REST APIs", "Databases 101", "Shipping to production"),
    ],
    miniProject: "A responsive personal portfolio site.",
    finalProject: "A deployed multi-page app with a working form and documented source code.",
  },
  {
    slug: "python-automation",
    title: "Python Programming & Automation",
    category: "Python",
    tagline: "Write Python that saves real hours of manual work.",
    level: "Beginner",
    weeks: 4,
    hoursPerWeek: 6,
    price: 3499,
    format: "Self-paced",
    tags: ["Python", "OOP", "Scripting"],
    outcomes: [
      "Master Python syntax",
      "Use object-oriented design",
      "Automate files & spreadsheets",
      "Work with APIs",
    ],
    prerequisites: ["None"],
    modules: [
      mod("Python Basics", "Data types", "Loops & conditions", "Functions"),
      mod("Thinking in Objects", "Classes", "Inheritance", "Modules & packages"),
      mod("Automation", "File handling", "Excel & CSV", "Web requests"),
    ],
    miniProject: "A file organizer script.",
    finalProject: "An automation tool that pulls data from an API and generates a report.",
  },
  {
    slug: "core-java-development",
    title: "Core Java Development",
    category: "Java",
    tagline: "Strong fundamentals for backend and application engineering.",
    level: "Intermediate",
    weeks: 4,
    hoursPerWeek: 7,
    price: 4499,
    format: "Hybrid",
    tags: ["Java", "OOP", "DSA"],
    outcomes: [
      "Write clean Java",
      "Apply OOP principles",
      "Use core data structures",
      "Build a console app",
    ],
    prerequisites: ["Basic programming logic"],
    modules: [
      mod("Java Foundations", "JVM & syntax", "Control flow", "Arrays & strings"),
      mod("OOP Deep Dive", "Encapsulation", "Polymorphism", "Interfaces"),
      mod("Collections & DSA", "Lists & maps", "Stacks & queues", "Sorting & searching"),
    ],
    miniProject: "A library management console app.",
    finalProject: "A Java application with persistent storage and unit tests.",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics with Python & SQL",
    category: "Data Analytics",
    tagline: "Turn messy data into clear, defensible insights.",
    level: "Beginner",
    weeks: 4,
    hoursPerWeek: 7,
    price: 3999,
    format: "Cohort",
    tags: ["Pandas", "SQL", "Visualization"],
    outcomes: ["Clean real datasets", "Query with SQL", "Build visualizations", "Present findings"],
    prerequisites: ["Basic Excel"],
    modules: [
      mod("Data Foundations", "Types of data", "Spreadsheet thinking", "Intro to Pandas"),
      mod("SQL", "SELECT & filters", "Joins", "Aggregations"),
      mod("Storytelling", "Charts that work", "Dashboards", "Writing findings"),
    ],
    miniProject: "Clean and summarize a public dataset.",
    finalProject: "An exploratory analysis notebook with visuals and a findings report.",
  },
  {
    slug: "ai-ml-foundations",
    title: "AI & Machine Learning Foundations",
    category: "AI & ML",
    tagline: "Train, evaluate and responsibly ship your first models.",
    level: "Intermediate",
    weeks: 4,
    hoursPerWeek: 8,
    price: 5999,
    format: "Cohort",
    tags: ["Python", "scikit-learn", "Responsible AI"],
    outcomes: [
      "Prepare data for ML",
      "Train common models",
      "Evaluate performance",
      "Understand AI ethics",
    ],
    prerequisites: ["Python basics"],
    modules: [
      mod("ML Concepts", "What learning means", "Supervised vs unsupervised", "Data prep"),
      mod("Models", "Regression", "Classification", "Clustering"),
      mod("Evaluation & Ethics", "Metrics", "Overfitting", "Responsible AI"),
    ],
    miniProject: "A price prediction model.",
    finalProject: "An end-to-end ML project with evaluation report and model card.",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "UI/UX Design",
    tagline: "Research, wireframe and prototype products people love.",
    level: "Beginner",
    weeks: 4,
    hoursPerWeek: 6,
    price: 3999,
    format: "Hybrid",
    tags: ["Figma", "Research", "Prototyping"],
    outcomes: [
      "Run user interviews",
      "Create wireframes",
      "Build interactive prototypes",
      "Assemble a case study",
    ],
    prerequisites: ["None"],
    modules: [
      mod("Design Principles", "Hierarchy", "Color & type", "Accessibility"),
      mod("Research", "Interviews", "Personas", "Journey maps"),
      mod("Prototyping", "Wireframes", "High-fidelity UI", "Usability testing"),
    ],
    miniProject: "Redesign a mobile app screen.",
    finalProject: "A full portfolio case study with a clickable prototype.",
  },
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    tagline: "Defensive security skills through legal, hands-on labs.",
    level: "Intermediate",
    weeks: 4,
    hoursPerWeek: 7,
    price: 5499,
    format: "Cohort",
    tags: ["Networking", "Linux", "Secure Coding"],
    outcomes: ["Understand threats", "Harden systems", "Write secure code", "Respond to incidents"],
    prerequisites: ["Basic networking"],
    modules: [
      mod("Security Basics", "CIA triad", "Threat models", "Networking"),
      mod("Defense", "Linux hardening", "Secure coding", "Authentication"),
      mod("Response", "Logging", "Incident response", "Reporting"),
    ],
    miniProject: "Harden a Linux virtual machine.",
    finalProject: "A defensive security assessment report in an authorized lab.",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Essentials",
    category: "Cloud & DevOps",
    tagline: "Version, automate and deploy like a modern team.",
    level: "Intermediate",
    weeks: 4,
    hoursPerWeek: 7,
    price: 4999,
    format: "Self-paced",
    tags: ["Git", "Linux", "CI/CD", "Docker"],
    outcomes: ["Use Git fluently", "Work on Linux", "Containerize apps", "Build CI/CD pipelines"],
    prerequisites: ["Any programming language"],
    modules: [
      mod("Foundations", "Cloud concepts", "Linux CLI", "Git workflows"),
      mod("Containers", "Docker basics", "Images", "Compose"),
      mod("Delivery", "CI pipelines", "Deployments", "Monitoring"),
    ],
    miniProject: "Containerize a small web app.",
    finalProject: "An automated pipeline that tests and deploys an app.",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Mobile Apps",
    tagline: "Design and build cross-platform mobile apps.",
    level: "Intermediate",
    weeks: 4,
    hoursPerWeek: 8,
    price: 5499,
    format: "Hybrid",
    tags: ["React Native", "APIs", "UI"],
    outcomes: ["Build mobile UIs", "Structure an app", "Integrate APIs", "Publish a build"],
    prerequisites: ["JavaScript basics"],
    modules: [
      mod("Mobile Basics", "Platforms", "Layouts", "Navigation"),
      mod("App Logic", "State", "Storage", "APIs"),
      mod("Ship It", "Testing", "Performance", "Builds"),
    ],
    miniProject: "A to-do app with local storage.",
    finalProject: "A mobile app consuming a public API.",
  },
  {
    slug: "digital-marketing-seo",
    title: "Digital Marketing & SEO",
    category: "Digital Marketing",
    tagline: "Plan, run and measure campaigns that grow audiences.",
    level: "Beginner",
    weeks: 4,
    hoursPerWeek: 5,
    price: 2999,
    format: "Self-paced",
    tags: ["SEO", "Content", "Analytics"],
    outcomes: [
      "Do keyword research",
      "Write optimized content",
      "Read analytics",
      "Plan a campaign",
    ],
    prerequisites: ["None"],
    modules: [
      mod("SEO", "How search works", "Keywords", "On-page SEO"),
      mod("Content", "Strategy", "Social media", "Email"),
      mod("Measurement", "Analytics", "KPIs", "Reporting"),
    ],
    miniProject: "An SEO audit of a website.",
    finalProject: "A full campaign plan with measurement framework.",
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
