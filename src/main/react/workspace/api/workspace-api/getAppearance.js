import { GetQuery } from "../GetQuery.js";

export const getAppearance = (ws_id) => {
    const URL = "/api/v1/workspace/appearance";
    return GetQuery(URL, {ws_id: ws_id});
}
