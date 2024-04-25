import { GetQuery } from "../GetQuery.js";

export const getUserPhoto = () => {
    const URL = "/api/v1/user/photo";
    return GetQuery(URL);
}
