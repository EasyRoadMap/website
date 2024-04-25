import { XWWWPostQuery } from "../XWWWPostQuery";

export const createProject = (ws_id, name, description, deadlineAt) => {
    const URL = "/api/v1/project/create";

    return XWWWPostQuery(URL, {
        name: name,
        description: description,
        deadlineAt: deadlineAt
    },
    {ws_id: ws_id}
);
}
