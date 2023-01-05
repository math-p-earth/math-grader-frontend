export interface SubmissionStatus {
  problemId: string
  userId: number
  currentAnswer: string
  correctAnswer?: string
  wrongAnswer: string[]
  status: 'NOATTEMPT' | 'INCORRECT' | 'CORRECT' | 'PENDING' | 'COMPLETE'
}
