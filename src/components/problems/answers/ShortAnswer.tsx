import { TextField } from "@mui/material";
import { AnswerState } from "../../../types/state";

export function ShortAnswer({
    answerState,
    setAnswerState,
}: {
    answerState: AnswerState;
    setAnswerState: Function;
}) {
    const onChange = (e: any) => {
        console.log(answerState);

        setAnswerState((prev: AnswerState) => ({
            ...prev,
            currentAnswer: e.target.value,
        }));
    };

    return (
        <div>
            <TextField
                fullWidth
                variant="outlined"
                label="Short Answer"
                size="small"
                onChange={onChange}
                value={answerState.currentAnswer}
            />
        </div>
    );
}
