import { GetQuery } from "../GetQuery.js";

export const getProjects = (ws_id) => {
    const URL = "/api/v1/workspace/projects";
    return GetQuery(URL, {ws_id: ws_id});
}
