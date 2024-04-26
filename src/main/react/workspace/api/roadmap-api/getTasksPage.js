import { GetQuery } from "../GetQuery.js";

export const getTasksPage = (rms_id, p) => {
    const URL = "/api/v1/roadmap/tasks";
    return GetQuery(URL, {rms_id: rms_id, p: p});
}
