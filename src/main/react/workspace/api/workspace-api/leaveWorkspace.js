import { XWWWPostQuery } from "../XWWWPostQuery";

export const leaveWorkspace = (ws_id) => {
    const URL = "/api/v1/workspace/leave";

    return XWWWPostQuery(URL, {
    },
    {
        ws_id: ws_id
    });
}
