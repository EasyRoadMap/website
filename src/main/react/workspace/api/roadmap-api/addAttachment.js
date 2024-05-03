import { XWWWPostQuery } from "../XWWWPostQuery";

export const addAttachment = (rms_id, attachment) => {
    const URL = "/api/v1/roadmap/task/attachment";

    return XWWWPostQuery(URL, {
        attachment: attachment
    },
    {rms_id: rms_id}
);
}
