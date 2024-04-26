import { XWWWPostQuery } from "../XWWWPostQuery";

export const createTask = (rms_id, status, name, description, deadlineAt, attachment) => {
    const URL = "/api/v1/roadmap/task/create";

    return XWWWPostQuery(URL, {
        status: status, 
        name: name, 
        description: description,
        deadlineAt: deadlineAt,
        attachment: attachment
    },
    {rms_id: rms_id}
);
}
