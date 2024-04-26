import { XWWWPostQuery } from "../XWWWPostQuery";

export const createStage = (pr_id, name) => {
    const URL = "/api/v1/roadmap/stage/create";

    return XWWWPostQuery(URL, {
        name: name
    },
    {pr_id: pr_id}
);
}
