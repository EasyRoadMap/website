import { GetQuery } from "../GetQuery.js";

export const getAttachableMembers = (pr_id) => {
    const URL = "/api/v1/project/members/attachable";
    return GetQuery(URL, {pr_id: pr_id});
}
