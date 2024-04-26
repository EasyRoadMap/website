import { GetQuery } from "../GetQuery.js";

export const getTask = (rmt_id) => {
    const URL = "/api/v1/roadmap/task";
    return GetQuery(URL, {rmt_id: rmt_id});
}
