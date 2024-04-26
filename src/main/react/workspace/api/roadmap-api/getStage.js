import { GetQuery } from "../GetQuery.js";

export const getStage = (rms_id) => {
    const URL = "/api/v1/roadmap/stage";
    return GetQuery(URL, {rms_id: rms_id});
}
