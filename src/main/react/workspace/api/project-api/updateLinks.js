import { PutQuery } from "../PutQuery";

export const updateLinks = (pr_id, name, url) => {
    const URL = "/api/v1/project/links";

    return PutQuery(URL, {
        name: name,
        url: url
    },
    {pr_id: pr_id},
    true
);
}