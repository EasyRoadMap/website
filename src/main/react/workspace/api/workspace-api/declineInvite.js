import { XWWWPostQuery } from "../XWWWPostQuery";

export const declineInvite = (invite_id) => {
    const URL = "/api/v1/workspace/invite/decline";

    return XWWWPostQuery(URL, {
    },
    {
        invite_id: invite_id
    });
}
