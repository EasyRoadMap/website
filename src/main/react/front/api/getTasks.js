import { GetQuery } from "./GetQuery";

export const getTasks = (rms_id) => {
    const URL = "/api/v1/public/roadmap/tasks";
    return GetQuery(URL, {rms_id: rms_id});
}
