export type LeaderQuote = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  description?: string;
  sourceUrl?: string;
  imageUrl?: string;
  imageSourceUrl?: string;
};

// Public quotations for preview only; these are not EGenTek endorsements.
export const sampleLeaderQuotes: LeaderQuote[] = [
  { id: "sample-andrew-ng", quote: "AI is the new electricity.", description: "A concise analogy for AI becoming a foundational technology across industries.", name: "Andrew Ng", role: "AI researcher and entrepreneur", company: "Stanford Graduate School of Business", sourceUrl: "https://www.gsb.stanford.edu/insights/andrew-ng-why-ai-new-electricity", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Andrew_Ng.png", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Andrew_Ng.png" },
  { id: "sample-sam-altman", quote: "AGI has the potential to give everyone incredible new capabilities.", description: "A view of advanced AI as a way to extend what people can do.", name: "Sam Altman", role: "OpenAI CEO", company: "Planning for AGI and beyond", sourceUrl: "https://openai.com/index/planning-for-agi-and-beyond/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Sam_Altman_CropEdit_James_Tamim.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg" },
  { id: "sample-demis-1", quote: "The reason I’ve worked on AI my whole life is that I’m passionate about science and finding out knowledge.", description: "Hassabis connects a lifelong interest in AI with scientific discovery.", name: "Demis Hassabis", role: "Google DeepMind co-founder and CEO", company: "Nobel Prize interview, 2024", sourceUrl: "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/interview/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Demis_Hassabis.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Demis_Hassabis.jpg" },
  { id: "sample-demis-2", quote: "If we could build AI in the right way, it could be the ultimate tool to help scientists, help us explore the universe around us.", description: "An optimistic outlook on AI supporting scientific research.", name: "Demis Hassabis", role: "Google DeepMind co-founder and CEO", company: "Nobel Prize interview, 2024", sourceUrl: "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/interview/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Demis_Hassabis.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Demis_Hassabis.jpg" },
  { id: "sample-demis-3", quote: "These systems, they’re tools. They’re very good for analyzing data and finding patterns and structure in data.", description: "A practical description of how AI tools can help researchers work with data.", name: "Demis Hassabis", role: "Google DeepMind co-founder and CEO", company: "Nobel Prize interview, 2024", sourceUrl: "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/interview/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Demis_Hassabis.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Demis_Hassabis.jpg" },
  { id: "sample-demis-4", quote: "This allows individual scientists to do so much more.", description: "AI tools can expand the reach of individual researchers.", name: "Demis Hassabis", role: "Google DeepMind co-founder and CEO", company: "Nobel Prize interview, 2024", sourceUrl: "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/interview/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Demis_Hassabis.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Demis_Hassabis.jpg" },
  { id: "sample-demis-5", quote: "The best scientists paired with these kinds of tools will be able to do incredible things.", description: "A positive case for people and AI accomplishing more together.", name: "Demis Hassabis", role: "Google DeepMind co-founder and CEO", company: "Nobel Prize interview, 2024", sourceUrl: "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/interview/", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Demis_Hassabis.jpg", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Demis_Hassabis.jpg" },
];

export const QUOTE_ROTATION_MS = 7000;