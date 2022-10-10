import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { SubmissionStatus } from "../../../types/state";
import { Markdown } from "../../md/Markdown";

const buttonSize = "40px";

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
        color: "error",
        disabled: false,
        disableRipple: true,
    } as ChoiceStyle,
};

export function Choices({
    choiceList,
    submissionStatus,
    setSubmissionStatus,
}: {
    choiceList: string[];
    submissionStatus: SubmissionStatus;
    setSubmissionStatus: Function;
}) {
    const [choiceStyleList, setChoiceStyleList] = React.useState<ChoiceStyle[]>(
        Array(choiceList.length).fill(choiceStyle.NORMAL)
    );

    const toggleAnswer = (val: string) => {
        setSubmissionStatus((prev: SubmissionStatus) => ({
            ...prev,
            currentAnswer: val,
        }));
    };

    React.useEffect(() => {
        choiceStyling(submissionStatus, choiceStyleList, setChoiceStyleList);
    }, [submissionStatus]);

    return (
        <Grid container spacing={1}>
            {choiceList.map((choice, idx) => {
                return (
                    <Choice
                        choiceNo={idx + 1}
                        caption={choice}
                        choiceStyling={choiceStyleList[idx]}
                        toggleAnswer={toggleAnswer}
                    />
                );
            })}
        </Grid>
    );
}

function Choice({
    choiceNo,
    caption,
    choiceStyling,
    toggleAnswer,
}: {
    choiceNo: number;
    caption: string;
    choiceStyling: ChoiceStyle;
    toggleAnswer: Function;
}) {
    return (
        <Grid item container spacing={1}>
            <Grid item alignSelf="center">
                <Button
                    {...choiceStyling}
                    sx={{
                        p: 0,
                        minWidth: buttonSize,
                        height: buttonSize,
                    }}
                    onClick={() => {
                        if (choiceStyling == choiceStyle.NORMAL)
                            toggleAnswer(choiceNo.toString());
                    }}
                >
                    <Typography variant="h6">{choiceNo}</Typography>
                </Button>
            </Grid>
            <Grid item alignSelf="center">
                <Paper
                    elevation={1}
                    sx={{
                        width: "300px",
                        pt: "1px",
                        pb: "1px",
                        pl: "10px",
                        pr: "10px",
                    }}
                >
                    <Markdown content={caption} />
                </Paper>
            </Grid>
        </Grid>
    );
}

function choiceStyling(
    submissionStatus: SubmissionStatus,
    choiceStyleList: ChoiceStyle[],
    setChoiceStyleList: Function
) {
    // For Debugging

    console.log(submissionStatus);

    if (
        submissionStatus.status == "NOATTEMPT" ||
        submissionStatus.status == "INCORRECT"
    ) {
        let newChoiceStyle = [];
        for (var i = 1; i <= choiceStyleList.length; i++) {
            const idx = i.toString();
            if (submissionStatus.wrongAnswer.includes(idx)) {
                newChoiceStyle.push(choiceStyle.WRONG);
            } else if (idx == submissionStatus.currentAnswer) {
                newChoiceStyle.push(choiceStyle.SELECTED);
            } else {
                newChoiceStyle.push(choiceStyle.NORMAL);
            }
        }

        setChoiceStyleList(newChoiceStyle);
    } else if (
        submissionStatus.status == "CORRECT" ||
        submissionStatus.status == "COMPLETE"
    ) {
        let newChoiceStyle = [];
        for (var i = 1; i <= choiceStyleList.length; i++) {
            const idx = i.toString();
            if (submissionStatus.wrongAnswer.includes(idx)) {
                newChoiceStyle.push(choiceStyle.WRONG);
            } else if (idx == submissionStatus.correctAnswer) {
                newChoiceStyle.push(choiceStyle.CORRECT);
            } else {
                newChoiceStyle.push(choiceStyle.DISABLED);
            }
        }

        setChoiceStyleList(newChoiceStyle);
    }
}

// SubmissionStatus {
//     currentAnswer: string | undefined;
//     correctAnswer: string;
//     wrongAnswer: string[];
//     submissionStatus: "ANSWERING" | "ANSWERED";
// }
