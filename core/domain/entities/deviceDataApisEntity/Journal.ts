export interface Journal {
  question_id: number;
  question_text: string;
  category: string;
  answer: boolean | null;
}
