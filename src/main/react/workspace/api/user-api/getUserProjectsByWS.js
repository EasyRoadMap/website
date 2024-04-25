import { GetQuery } from "../GetQuery.js";

export const getUserProjectsByWS = (ws_id) => {
    const URL = "/api/v1/user/projects";
    return GetQuery(URL, params = {ws_id: ws_id});
}
