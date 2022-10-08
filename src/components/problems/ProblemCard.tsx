import {
    Avatar,
    Box,
    Divider,
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

export function ProblemCard({ problem }: { problem: ProblemDto }) {
    return (
        <Paper
            sx={{
                p: "10px",
                minWidth: "600px",
                maxWidth: "900px",
            }}
            elevation={3}
        >
            <Grid container direction="column" spacing={1} padding="10px">
                <Grid item container>
                    <Grid item>
                        <Avatar variant="rounded">{problem.order}</Avatar>
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item>
                    <Markdown content={problem.content} />
                </Grid>
                <Grid
                    item
                    sx={{
                        ml: "80px",
                    }}
                >
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
