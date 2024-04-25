import { GetQuery } from "../GetQuery.js";

export const getLinks = (pr_id) => {
    const URL = "/api/v1/project/links";
    return GetQuery(URL, {pr_id: pr_id});
}
