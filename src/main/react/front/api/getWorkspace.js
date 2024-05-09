import { GetQuery } from "./GetQuery";

export const getWorkspace = (ws_id) => {
    const URL = "/api/v1/public/workspace";
    return GetQuery(URL, {ws_id: ws_id});
}
