export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
}

export const SUBJECTS: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    description: "Fundamental mathematical concepts and problem solving",
    credits: 4
  },
  {
    id: "2", 
    name: "English Literature",
    code: "ENG201",
    description: "Analysis of literary works and writing skills",
    credits: 3
  },
  {
    id: "3",
    name: "Computer Science",
    code: "CS301",
    description: "Programming fundamentals and software development",
    credits: 4
  },
  {
    id: "4",
    name: "Physics",
    code: "PHY101",
    description: "Classical mechanics and electromagnetic theory",
    credits: 4
  },
  {
    id: "5",
    name: "Chemistry",
    code: "CHEM101", 
    description: "Organic and inorganic chemistry principles",
    credits: 4
  },
  {
    id: "6",
    name: "Biology",
    code: "BIO101",
    description: "Cell biology and molecular processes",
    credits: 3
  },
  {
    id: "7",
    name: "History",
    code: "HIST201",
    description: "World history and cultural developments",
    credits: 3
  },
  {
    id: "8",
    name: "Art & Design",
    code: "ART101",
    description: "Visual arts and creative design principles",
    credits: 2
  },
  {
    id: "9",
    name: "Psychology",
    code: "PSY201",
    description: "Human behavior and cognitive processes",
    credits: 3
  },
  {
    id: "10",
    name: "Economics",
    code: "ECON101",
    description: "Microeconomics and macroeconomics fundamentals",
    credits: 3
  }
];