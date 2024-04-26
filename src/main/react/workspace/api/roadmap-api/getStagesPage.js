import { GetQuery } from "../GetQuery.js";

export const getStagesPage = (pr_id, p) => {
    const URL = "/api/v1/roadmap/stages";
    return GetQuery(URL, {pr_id: pr_id, p: p});
}
