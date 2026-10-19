export type LeaderQuote = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  description: string;
  sourceUrl: string;
  imageUrl: string;
  imageSourceUrl: string;
};

// Public statements from each leader, shown for context. These are not EGenTek
// endorsements. Each leader appears once. Photos are self-hosted in /public/leaders
// with their Wikimedia Commons source linked as the photo credit.
export const leaderQuotes: LeaderQuote[] = [
  {
    id: "andrew-ng",
    quote: "AI is the new electricity.",
    description: "A concise analogy for AI becoming a foundational technology across industries.",
    name: "Andrew Ng",
    role: "AI researcher and entrepreneur",
    company: "Stanford Graduate School of Business",
    sourceUrl: "https://www.gsb.stanford.edu/insights/andrew-ng-why-ai-new-electricity",
    imageUrl: "/leaders/andrew-ng.png",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Andrew_Ng.png",
  },
  {
    id: "sam-altman",
    quote: "AGI has the potential to give everyone incredible new capabilities.",
    description: "A view of advanced AI as a way to extend what people can do.",
    name: "Sam Altman",
    role: "OpenAI CEO",
    company: "Planning for AGI and beyond",
    sourceUrl: "https://openai.com/index/planning-for-agi-and-beyond/",
    imageUrl: "/leaders/sam-altman.jpg",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg",
  },
  {
    id: "demis-hassabis",
    quote:
      "I’ve worked on this my whole life because I believe it’s going to be the most beneficial technology to humanity.",
    description:
      "Hassabis explains his lifelong commitment to AI as a technology that could benefit humanity.",
    name: "Demis Hassabis",
    role: "Google DeepMind co-founder and CEO",
    company: "AFP report, October 2024",
    sourceUrl:
      "https://www.macaubusiness.com/demis-hassabis-from-chess-prodigy-to-nobel-winning-ai-pioneer/",
    imageUrl: "/leaders/demis-hassabis.jpg",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Demis_Hassabis,_2024_Nobel_Prize_Laureate_in_Chemistry_7_(cropped).jpg",
  },
  {
    id: "jensen-huang",
    quote:
      "The age of AI has started. A new computing era that will impact every industry and every field of science.",
    description:
      "Huang describes AI as the start of a new computing era across industries and research.",
    name: "Jensen Huang",
    role: "NVIDIA founder and CEO",
    company: "HKUST honorary doctorate speech, November 2024",
    sourceUrl:
      "https://www.thestandard.com.hk/news/article/223055/Nvidia-CEO-Huang-says-the-age-of-AI-has-started",
    imageUrl: "/leaders/jensen-huang.jpg",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Jen-Hsun_Huang_2025.jpg",
  },
  {
    id: "sundar-pichai",
    quote: "I think of it as something more profound than electricity or fire.",
    description:
      "Pichai frames AI as one of the most significant technologies humanity has developed.",
    name: "Sundar Pichai",
    role: "Alphabet and Google CEO",
    company: "World Economic Forum, Davos, 2018",
    sourceUrl:
      "https://www.hollywoodreporter.com/business/business-news/google-ceo-calls-ai-more-profound-electricity-fire-1077805/",
    imageUrl: "/leaders/sundar-pichai.jpg",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Sundar_Pichai_-_2023_(cropped).jpg",
  },
  {
    id: "satya-nadella",
    quote:
      "The one big design decision we made was to think about this as a copilot, not as an autopilot.",
    description: "Nadella explains that Microsoft designed its AI to keep people in control.",
    name: "Satya Nadella",
    role: "Microsoft CEO",
    company: "Interview, December 2023",
    sourceUrl:
      "https://www.gpb.org/news/2023/12/27/microsoft-ceo-satya-nadella-discusses-the-promise-and-potential-perils-of-ai",
    imageUrl: "/leaders/satya-nadella.jpg",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:MS-Exec-Nadella-Satya-2017-08-31-22_(cropped).jpg",
  },
];

export const QUOTE_ROTATION_MS = 7000;
