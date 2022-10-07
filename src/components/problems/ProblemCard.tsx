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
import { Markdown } from "../md/Markdown";
import { Answer } from "./answers/Answer";
import { Choices } from "./answers/Choices";

export function ProblemCard({ problem }: { problem: ProblemDto }) {
    return (
        <Paper
            sx={{
                p: "10px",
                minWidth: "600px",
                maxWidth: "900px",
            }}
        >
            <Grid container direction="column" spacing={2} padding="10px">
                <Grid item>
                    <Markdown content={problem.content} />
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
