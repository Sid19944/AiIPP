export interface AnswerFeedback {
  accuracy: number;
  clarity: number;
  depth: number;
  score: number;
  feedback: string;
  good: string[];
  idealAnswer: string;
  missing: string[];
  tips: string[];
}
