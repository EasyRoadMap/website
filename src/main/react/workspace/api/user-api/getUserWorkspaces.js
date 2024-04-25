import { GetQuery } from "../GetQuery.js";

export const getUserWorkspaces = () => {
    const URL = "/api/v1/user/workspaces";
    return GetQuery(URL);
}
