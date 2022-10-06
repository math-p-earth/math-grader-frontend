import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const buttonSize = "40px";

interface ChoiceState {
    currentAnswer: number | undefined;
    correctAnswer: number;
    wrongAnswer: number[];
    answerState: "ANSWERING" | "ANSWERED";
}

interface ChoiceStyle {
    variant: "outlined" | "contained";
    color: "primary" | "success" | "error";
    disabled: boolean;
    disableRipple: boolean;
}

const choiceStyle = {
    NORMAL: {
        variant: "outlined",
        color: "primary",
        disabled: false,
        disableRipple: false,
    } as ChoiceStyle,
    SELECTED: {
        variant: "contained",
        color: "primary",
        disabled: false,
        disableRipple: false,
    } as ChoiceStyle,
    DISABLED: {
        variant: "outlined",
        color: "primary",
        disabled: true,
        disableRipple: false,
    } as ChoiceStyle,
    CORRECT: {
        variant: "contained",
        color: "success",
        disabled: false,
        disableRipple: true,
    } as ChoiceStyle,
    WRONG: {
        variant: "contained",
        color: "primary",
        disabled: false,
        disableRipple: true,
    } as ChoiceStyle,
};

export function ChoiceList() {
    const [choiceState, setChoiceState] = React.useState<ChoiceState>({
        currentAnswer: undefined,
        correctAnswer: 1,
        wrongAnswer: [],
        answerState: "ANSWERING",
    });

    return (
        <Grid container spacing={1}>
            {[1, 2, 3, 4].map((num) => {
                return (
                    <Choice choiceNo={num} caption={"Blah Blah Blah Blah"} />
                );
            })}
        </Grid>
    );
}

function Choice({ choiceNo, caption }: { choiceNo: number; caption: string }) {
    return (
        <Grid item container spacing={1}>
            <Grid item>
                <Button
                    {...choiceStyle.CORRECT}
                    sx={{
                        p: 0,
                        minWidth: buttonSize,
                        height: buttonSize,
                    }}
                >
                    <Typography variant="h6">{choiceNo}</Typography>
                </Button>
            </Grid>
            <Grid item alignSelf="center">
                <Paper
                    elevation={1}
                    sx={{
                        pt: "3px",
                        pb: "3px",
                        pl: "10px",
                        pr: "10px",
                    }}
                >
                    <Typography>{caption}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
