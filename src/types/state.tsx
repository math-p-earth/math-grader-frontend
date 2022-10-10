export interface SubmissionStatus {
    problemId: number;
    userId: number;
    currentAnswer: string | undefined;
    correctAnswer?: string;
    wrongAnswer: string[];
    status: "NOATTEMPT" | "INCORRECT" | "CORRECT" | "PENDING" | "COMPLETE";
}
