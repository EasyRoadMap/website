import { PutQuery } from "../PutQuery";

export const updateInfo = (pr_id, name, description, deadlineAt) => {
    const URL = "/api/v1/project/info";

    return PutQuery(URL, {
        name: name,
        description: description,
        deadlineAt: deadlineAt
    },
    {pr_id: pr_id}
);
}