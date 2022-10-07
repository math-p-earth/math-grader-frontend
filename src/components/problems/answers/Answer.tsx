import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { ProblemType } from "../../../types/dto";
import { Choices } from "./Choices";
import { ShortAnswer } from "./ShortAnswer";

export interface AnswerState {
    currentAnswer: string | undefined;
    correctAnswer: string;
    wrongAnswer: string[];
    answerStatus: "ANSWERING" | "ANSWERED";
}

export function Answer({
    problemType,
    answer,
    choices,
}: {
    problemType: ProblemType;
    answer: string;
    choices: string[];
}) {
    const [answerState, setAnswerState] = React.useState<AnswerState>({
        currentAnswer: "",
        correctAnswer: "1",
        wrongAnswer: ["3"],
        answerStatus: "ANSWERING",
    });

    const onClear = () => {
        console.log(answerState);
        setAnswerState((prev) => ({ ...prev, currentAnswer: "" }));
    };

    const onSubmit = () => {};

    return (
        <Grid container direction="row">
            <Grid item>
                <Typography variant="body2">
                    {JSON.stringify(answerState)}
                </Typography>
            </Grid>
            <Grid item>
                {(() => {
                    if (problemType == "MCQ") {
                        return (
                            <Choices
                                choiceList={choices}
                                answerState={answerState}
                                setAnswerState={setAnswerState}
                            />
                        );
                    } else if (problemType == "SHORT") {
                        return (
                            <ShortAnswer
                                answerState={answerState}
                                setAnswerState={setAnswerState}
                            />
                        );
                    }
                })()}
            </Grid>
            <Grid item>
                <Button onClick={onClear}>Clear</Button>
            </Grid>
            <Grid item>
                <Button>Submit</Button>
            </Grid>
        </Grid>
    );
}
