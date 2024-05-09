import { GetQuery } from "./GetQuery";

export const getProject = (pr_id) => {
    const URL = "/api/v1/public/project";
    return GetQuery(URL, {pr_id: pr_id});
}
