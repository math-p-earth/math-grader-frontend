import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { ProblemType } from "../../../types/dto";
import { AnswerState } from "../../../types/state";
import { Choices } from "./Choices";
import { ShortAnswer } from "./ShortAnswer";

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
        problemId: 0,
        userId: 0,
        currentAnswer: "",
        correctAnswer: "",
        wrongAnswer: [],
        status: "NOATTEMPT",
    });

    const onClear = () => {
        console.log(answerState);
        setAnswerState((prev) => ({ ...prev, currentAnswer: "" }));
    };

    const onSubmit = () => {};

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={9}>
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
            <Grid item xs={1}>
                <Divider orientation="vertical" />
            </Grid>
            <Grid
                item
                xs={2}
                container
                direction="column"
                justifyContent="end"
                spacing={1}
            >
                <Grid item>
                    <Button onClick={onClear}>Clear</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained">Submit</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="body2">
                    {JSON.stringify(answerState)}
                </Typography>
            </Grid>
        </Grid>
    );
}
