import { GetQuery } from "../GetQuery.js";

export const getInfo = (pr_id) => {
    const URL = "/api/v1/project/info";
    return GetQuery(URL, {pr_id: pr_id});
}
