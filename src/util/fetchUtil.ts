import { ProblemDto } from '../types/dto'

export function problemFetchResponse(data: any) {
  return {
    id: data?.id,
    type: data?.type,
    content: data?.content,
    answer: data?.answer,
    choices: data?.choices.map((c: any) => c.choice),
    order: data?.order,
    score: data?.score,
  } as ProblemDto
}

export function sourceFetchResponse(data: any) {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    type: data?.type,
    book: { author: data?.book?.author, isbn: data?.book?.isbn },
    paper: {
      timeLimit: data?.paper?.timeLimit,
      datePublished: new Date(data?.paper?.datePublished),
    },
    length: 0,
  }
}

export function problemListFetchResponse(data: any) {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    type: data?.type,
    length: data?.problems.length,
  }
}

// export interface SourceDto {
//   id: string
//   name: string
//   description: string
//   type: SourceType
//   book: {
//     author: string
//     isbn: string
//   }
//   paper: {
//     timeLimit: number
//     datePublished: Date
//   }
// }
