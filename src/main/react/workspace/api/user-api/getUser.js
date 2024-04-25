import { GetQuery } from "../GetQuery.js";

export const getUser = () => {
    const URL = "/api/v1/user";
    return GetQuery(URL);
}
