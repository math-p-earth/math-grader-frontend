import {
  ProblemDto,
  ProblemListDto,
  ProblemListType,
  ProblemType,
  SourceDto,
  SourceType,
} from '../types/dto'

export interface UserResponseInterface {
  id: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
  createdAt: string
  updatedAt: string
}

export interface ProblemResponseInterface {
  id: string
  content: string
  type: ProblemType
  choices: ChoiceResponseInterface[]
  answer?: string
  tags?: string[] | TagResponseInterface[]
  createdAt: string
  updatedAt: string
}

export interface TagResponseInterface {
  id: string
  name?: string
  createdAt: string
  updatedAt: string
}

export interface ProblemListResponseInterface {
  id: string
  name: string
  description?: string
  type?: ProblemListType
  problems?: string[] | ProblemResponseInterface[]
  createdAt: string
  updatedAt: string
}

export interface SourceResponseInterface {
  id: string
  name: string
  description?: string
  type: SourceType
  problems?: string[] | ProblemResponseInterface[]
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

interface ChoiceResponseInterface {
  id: string | undefined
  choice: string | undefined
}

export function problemFetchResponse(data: ProblemResponseInterface) {
  return {
    id: data?.id,
    type: data?.type,
    content: data?.content,
    answer: data?.answer,
    choices: data?.choices?.map((c: ChoiceResponseInterface) => c.choice),
  } as ProblemDto
}

export function sourceFetchResponse(data: SourceResponseInterface) {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    type: data?.type,
    book: { author: data?.book?.author, isbn: data?.book?.isbn },
    paper: {
      timeLimit: data?.paper?.timeLimit,
      datePublished:
        data?.paper?.datePublished !== undefined ? new Date(data?.paper?.datePublished) : undefined,
    },
    length: 0,
  } as SourceDto
}

export function problemListFetchResponse(data: ProblemListResponseInterface) {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    type: data?.type,
    length: data?.problems?.length,
  } as ProblemListDto
}
