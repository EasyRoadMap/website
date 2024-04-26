import { PatchQuery } from "../PatchQuery";

export const updateStageName = (rms_id, name) => {
    const URL = "/api/v1/roadmap/stage";

    return PatchQuery(URL, {
        name: name
    },
    {rms_id: rms_id}
);
}