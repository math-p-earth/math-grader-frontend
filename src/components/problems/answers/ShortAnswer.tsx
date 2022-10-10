import { TextField } from "@mui/material";
import React from "react";
import { SubmissionStatus } from "../../../types/state";

export function ShortAnswer({
    submissionStatus,
    setSubmissionStatus,
}: {
    submissionStatus: SubmissionStatus;
    setSubmissionStatus: Function;
}) {
    const [helperWrong, setHelperWrong] = React.useState<string>("");

    React.useEffect(() => {
        let str = "You have answered the following: ";
        const wrongAnswer = submissionStatus.wrongAnswer;
        for (var i = 0; i < wrongAnswer.length; i++) {
            str += wrongAnswer[i];
            if (i != wrongAnswer.length - 1) {
                str += ", ";
            }
        }

        setHelperWrong(str);
    }, [submissionStatus]);

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
                error={submissionStatus.status == "INCORRECT"}
                helperText={helperWrong}
            />
        </div>
    );
}
