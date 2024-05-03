import { PutQuery } from "../PutQuery";

export const putTask = (rmt_id, status, name, description, deadlineAt, attachment) => {
    console.debug("putask", status, name, description, deadlineAt, attachment);
    const URL = "/api/v1/roadmap/task";

    return PutQuery(URL, {
        status: status,
        name: name,
        description: description,
        deadlineAt: deadlineAt,
        attachment: attachment
    },
    {rmt_id: rmt_id},
    true
);
}