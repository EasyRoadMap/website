import { GetQuery } from "../GetQuery.js";

export const getPhoto = (pr_id) => {
    const URL = "/api/v1/project/photo";
    return GetQuery(URL, {pr_id: pr_id});
}
