import { DeleteQuery } from "../DeleteQuery";

export const deleteProject = (pr_id, password) => {
    const URL = "/api/v1/project";
    return DeleteQuery(URL, {password: password}, {pr_id: pr_id});
}
