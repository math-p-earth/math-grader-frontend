import {
    Box,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import React from "react";
import { ChoiceList } from "./answers/Choices";

export function ProblemCard() {
    return (
        <Paper>
            <ChoiceList />
        </Paper>
    );
}

// const [alignment, setAlignment] = React.useState('web');

//   const handleChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string,
//   ) => {
//     setAlignment(newAlignment);
//   };
