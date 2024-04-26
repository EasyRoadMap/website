import { DeleteQuery } from "../DeleteQuery";

export const deleteTask = (rmt_id) => {
    const URL = "/api/v1/roadmap/task";
    return DeleteQuery(URL, {}, {rmt_id: rmt_id});
}
