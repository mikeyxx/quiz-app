export interface AnswerOptions {
  _id: string;
  option: string;
  correct: boolean;
}

export interface Quiz {
  _id: string;
  question: string;
  answer: AnswerOptions[];
}

export interface User {
  name: string;
  email: string;
  password: string;
}
