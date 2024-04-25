import { GetQuery } from "../GetQuery.js";

export const getMembers = (pr_id) => {
    const URL = "/api/v1/project/members";
    return GetQuery(URL, {pr_id: pr_id});
}
