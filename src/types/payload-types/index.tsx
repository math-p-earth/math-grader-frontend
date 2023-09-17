export * from './custom'

/* eslint-disable @typescript-eslint/ban-types */
/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    courses: Course
    problems: Problem
    'problem-lists': ProblemList
    sources: Source
    students: Student
    submissions: Submission
    tags: Tag
    uploads: Upload
    users: User
  }
  globals: {}
}
export interface Course {
  id: string
  name: string
  problemLists: ProblemList[]
  sources: Source[]
  createdAt: string
  updatedAt: string
}
export interface ProblemList {
  id: string
  name: string
  description: string
  type: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
  problems: Problem[]
  createdAt: string
  updatedAt: string
}
export interface Problem {
  id: string
  content: string
  type: 'MCQ' | 'SHORT' | 'TF' | 'PROOF'
  choices: {
    choice: string
    id: string
  }[]
  answer: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
}
export interface Tag {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}
export interface Source {
  id: string
  name: string
  description?: string
  type: 'GENERIC' | 'BOOK' | 'PAPER'
  problems: Problem[]
  book: {
    author: string
    isbn: string
  }
  paper: {
    timeLimit: number
    datePublished: string
  }
  createdAt: string
  updatedAt: string
}
export interface Student {
  id: string
  email: string
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'RATHER_NOT_SAY'
  firstName: string
  lastName: string
  grade: 'M4' | 'M5' | 'M6'
  school: string
  contact: {
    phone: string
    discord: string
    line: string
  }
  status: 'PENDING' | 'APPROVED'
  courses: Course[]
  googleId: string
  createdAt: string
  updatedAt: string
}
export interface Submission {
  id: string
  problem: string | Problem
  student: string | Student
  status: 'CORRECT_APPROVED' | 'CORRECT' | 'INCORRECT_APPROVED' | 'INCORRECT' | 'PENDING'
  content: string
  file: string | Upload
  score: number
  comment: string
  createdAt: string
  updatedAt: string
}
export interface Upload {
  id: string
  owner?:
    | {
        value: string | User
        relationTo: 'users'
      }
    | {
        value: string | Student
        relationTo: 'students'
      }
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  createdAt: string
  updatedAt: string
}
export interface User {
  id: string
  roles: ('ADMIN' | 'EDITOR')[]
  email: string
  resetPasswordToken: string
  resetPasswordExpiration: string
  loginAttempts: number
  lockUntil: string
  createdAt: string
  updatedAt: string
  password: string
}
