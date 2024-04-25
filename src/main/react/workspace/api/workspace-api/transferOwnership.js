import { XWWWPostQuery } from "../XWWWPostQuery";

export const transferOwnership = (ws_id, email) => {
    const URL = "/api/v1/workspace/transfer";

    return XWWWPostQuery(URL, {
        email: email
    },
    {
        ws_id: ws_id
    });
}
