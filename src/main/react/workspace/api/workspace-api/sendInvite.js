import { XWWWPostQuery } from "../XWWWPostQuery";

export const sendInvite = (ws_id, email, role) => {
    const URL = "/api/v1/workspace/invite";

    return XWWWPostQuery(URL, {
        email: email,
        role: role
    },
    {
        ws_id: ws_id
    });
}
