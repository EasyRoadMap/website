import { PostMultipartQuery } from "../PostMultipartQuery";

export const addAttachment = (rms_id, attachment) => {
    const URL = "/api/v1/roadmap/task/attachment";

    return PostMultipartQuery(URL, {
        file: attachment
    },
    {rms_id: rms_id}
);
}
