import { PatchQuery } from "../PatchQuery";

export const updateUser = (name) => {
    const URL = "/api/v1/user";

    return PatchQuery(URL, {
        name: name
    });
}
