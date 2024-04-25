import { GetQuery } from "../GetQuery.js";

export const getInvite = (invite_id) => {
    const URL = "/api/v1/workspace/invite";
    return GetQuery(URL, {invite_id: invite_id});
}
