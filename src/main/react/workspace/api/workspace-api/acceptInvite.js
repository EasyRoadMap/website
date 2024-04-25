import { XWWWPostQuery } from "../XWWWPostQuery";

export const acceptInvite = (invite_id) => {
    const URL = "/api/v1/workspace/invite/accept";

    return XWWWPostQuery(URL, {
    },
    {
        invite_id: invite_id
    });
}
