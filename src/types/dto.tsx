export interface TagDto {
    id: number;
    name: string;
    tagType: TagType;
    description: string;
    examType?: ExamType;
    timeLimit?: number;
    datePublished?: Date;

    problemList: ProblemDto[];
}

export interface ProblemDto {
    id: number;
    problemType: ProblemType;
    content: string;
    difficulty: number;
    answer: string;
    choices: string[];
    order?: number;
    score?: number;
    source?: string;
}

export type ProblemType = "MCQ" | "SHORT" | "TF" | "PROOF";
export type TagType = "PASTPAPER" | "TOPIC" | "DRILL";
export type ExamType = "PAPER" | "SIM";
