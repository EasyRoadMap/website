import { GetQuery } from "../GetQuery.js";

export const getAttachments = (rmt_id) => {
    const URL = "/api/v1/roadmap/task/attachments";
    return GetQuery(URL, {rmt_id: rmt_id});
}
