export interface ProblemDto {
  id: string
  type: ProblemType
  content: string
  answer: string
  choices: string[]
  order?: number
  score?: number
  source?: string
}

export interface SourceDto {
  id: string
  name: string
  description: string
  type: SourceType
  book: {
    author: string
    isbn: string
  }
  paper: {
    timeLimit: number
    datePublished: Date
  }
  length: number
}

export type ProblemType = 'MCQ' | 'SHORT' | 'TF' | 'PROOF'
export type SourceType = 'BOOK' | 'PAPER'
