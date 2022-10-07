import {
    Box,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import React from "react";
import { ProblemDto } from "../../types/dto";
import { Answer } from "./answers/Answer";
import { Choices } from "./answers/Choices";

export function ProblemCard({ problem }: { problem: ProblemDto }) {
    return (
        <Paper
            sx={{
                p: "10px",
                width: "600px",
            }}
        >
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography align="left" variant="body1">
                        {problem.content}
                    </Typography>
                </Grid>
                <Grid item>
                    {
                        <Answer
                            problemType={problem.problemType}
                            answer={problem.answer}
                            choices={
                                problem.problemType == "MCQ"
                                    ? problem.choices
                                    : []
                            }
                        />
                    }
                </Grid>
            </Grid>
        </Paper>
    );
}
