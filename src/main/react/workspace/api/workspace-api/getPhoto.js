import { GetQuery } from "../GetQuery.js";

export const getPhoto = (ws_id) => {
    const URL = "/api/v1/workspace/photo";
    return GetQuery(URL, {ws_id: ws_id});
}
