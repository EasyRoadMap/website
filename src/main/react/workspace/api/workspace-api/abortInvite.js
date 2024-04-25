import { XWWWPostQuery } from "../XWWWPostQuery";

export const abortInvite = (ws_id, email) => {
    const URL = "/api/v1/workspace/invite/abort";

    return XWWWPostQuery(URL, {
        email: email,
    },
    {
        ws_id: ws_id
    });
}
