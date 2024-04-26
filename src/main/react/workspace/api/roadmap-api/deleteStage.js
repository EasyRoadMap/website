import { DeleteQuery } from "../DeleteQuery";

export const deleteStage = (rms_id) => {
    const URL = "/api/v1/roadmap/stage";
    return DeleteQuery(URL, {}, {rms_id: rms_id});
}
