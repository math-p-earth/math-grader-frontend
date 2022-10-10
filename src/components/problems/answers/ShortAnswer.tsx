import { TextField } from "@mui/material";
import { SubmissionStatus } from "../../../types/state";

export function ShortAnswer({
    submissionStatus,
    setSubmissionStatus,
}: {
    submissionStatus: SubmissionStatus;
    setSubmissionStatus: Function;
}) {
    const onChange = (e: any) => {
        console.log(submissionStatus);

        setSubmissionStatus((prev: SubmissionStatus) => ({
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
                value={submissionStatus ? submissionStatus.currentAnswer : ""}
            />
        </div>
    );
}
