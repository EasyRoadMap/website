import { GetQuery } from "../GetQuery.js";

export const getAttachment = (rmta_id) => {
    const URL = "/api/v1/roadmap/task/attachment";
    return GetQuery(URL, {rmta_id: rmta_id});
}
