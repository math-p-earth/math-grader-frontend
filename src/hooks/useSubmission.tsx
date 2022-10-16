import React from "react";
import useSWR from "swr";
import { SubmissionStatus } from "../types/state";

export function useSubmission(problemId: number, userId: number) {
    const [submissionStatus, setSubmissionStatus] =
        React.useState<SubmissionStatus>({
            problemId: problemId,
            userId: 0,
            currentAnswer: "",
            correctAnswer: "",
            wrongAnswer: [],
            status: "NOATTEMPT",
        });

    const { data, error } = useSWR(["/submission/", submissionStatus]);

    return {
        data: data,
        isLoading: !data && !error,
        error: error,
        setSubmissionStatus: setSubmissionStatus,
    };
}
