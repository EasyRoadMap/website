import { GetQuery } from "../GetQuery.js";

export const getInfo = (ws_id) => {
    const URL = "/api/v1/workspace/info";
    return GetQuery(URL, {ws_id: ws_id});
}
