import { DeleteQuery } from "../DeleteQuery.js";

export const deleteUser = (password) => {
    const URL = "/api/v1/user";
    return DeleteQuery(URL, {password: password});
}
