import React from "react";
import useSWR from "swr";
import { AnswerState } from "../types/state";
import { tagFetchResponse } from "../util/fetchUtil";

export function useSubmission(problemId: number, userId: number) {
    const [answerState, setAnswerState] = React.useState<AnswerState>({
        problemId: 0,
        userId: 0,
        currentAnswer: "",
        correctAnswer: "",
        wrongAnswer: [],
        status: "NOATTEMPT",
    });

    const { data, error } = useSWR(["/submission/"]);

    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
