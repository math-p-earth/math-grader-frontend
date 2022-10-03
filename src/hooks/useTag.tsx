import React from "react";
import useSWR from "swr";

export function useTag() {
    const [tagId, setTagId] = React.useState<number>(1);

    console.log("TagId: ", tagId);

    const { data, error } = useSWR(["/tag/" + tagId.toString()]);

    return {
        setTagId: setTagId,
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
