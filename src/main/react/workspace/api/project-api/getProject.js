import { GetQuery } from "../GetQuery.js";

export const getProject = (pr_id) => {
    const URL = "/api/v1/project";
    return GetQuery(URL, {pr_id: pr_id});
}
