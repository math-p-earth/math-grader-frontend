import { TextField } from "@mui/material";
import { AnswerState } from "./Answer";

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
                variant="outlined"
                label="Short Answer"
                size="small"
                onChange={onChange}
                value={answerState.currentAnswer}
            />
        </div>
    );
}
