import { Grid } from "@mui/material";
import { ProblemCard } from "../components/problems/ProblemCard";
import { useTag } from "../hooks/useTag";

export function ProblemListPage() {
    const { data, isLoading, error, setTagId } = useTag();

    console.log(data);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {data &&
                data.problemList.map((pb) => {
                    return (
                        <Grid item>
                            <ProblemCard problem={pb} />
                        </Grid>
                    );
                })}
        </Grid>
    );
}
