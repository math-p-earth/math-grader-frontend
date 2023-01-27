/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problems".
 */
export interface Problem {
  id: string
  content: string
  type: 'MCQ' | 'SHORT' | 'TF' | 'PROOF'
  choices: {
    choice?: string
    id?: string
  }[]
  answer?: string
  tags?: string[] | Tag[]
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string
  name?: string
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problem-lists".
 */
export interface ProblemList {
  id: string
  name: string
  description?: string
  type?: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
  problems?: string[] | Problem[]
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sources".
 */
export interface Source {
  id: string
  name: string
  description?: string
  type: 'GENERIC' | 'BOOK' | 'PAPER'
  problems?: string[] | Problem[]
  book: {
    author?: string
    isbn?: string
  }
  paper: {
    timeLimit?: number
    datePublished?: string
  }
  createdAt: string
  updatedAt: string
}

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

export interface ProblemListDto {
  id: string
  name: string
  description: string
  type: ProblemListType
  length: number
}

export type ProblemType = 'MCQ' | 'SHORT' | 'TF' | 'PROOF'
export type SourceType = 'BOOK' | 'PAPER'
export type ProblemListType = 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
