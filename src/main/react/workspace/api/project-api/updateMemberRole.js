import { PatchQuery } from "../PatchQuery";

export const updateMemberRole = (ws_id, email, role) => {
    const URL = "/api/v1/project/members/role";

    return PatchQuery(URL, {
        email: email,
        role: role
    },
    {ws_id: ws_id}
);
}