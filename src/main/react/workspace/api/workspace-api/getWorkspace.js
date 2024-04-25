import { GetQuery } from "../GetQuery.js";

export const getWorkspace = (ws_id) => {
    console.log("params getworkspcae");
    console.log(ws_id);
    const URL = "/api/v1/workspace";
    return GetQuery(URL, {ws_id: ws_id});
}
