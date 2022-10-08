export interface AnswerState {
    problemId: number;
    userId: number;
    currentAnswer: string | undefined;
    correctAnswer?: string;
    wrongAnswer: string[];
    status: "NOATTEMPT" | "INCORRECT" | "CORRECT" | "PENDING" | "COMPLETE";
}
