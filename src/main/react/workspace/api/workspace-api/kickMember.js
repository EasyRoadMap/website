import { XWWWPostQuery } from "../XWWWPostQuery";

export const kickMember = (ws_id, email) => {
    const URL = "/api/v1/workspace/members/kick";

    return XWWWPostQuery(URL, {
        email: email
    },
    {
        ws_id: ws_id
    });
}
