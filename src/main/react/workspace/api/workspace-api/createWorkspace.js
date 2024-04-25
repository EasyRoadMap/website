import { XWWWPostQuery } from "../XWWWPostQuery";

export const createWorkspace = (name, description) => {
    const URL = "/api/v1/workspace/create";

    return XWWWPostQuery(URL, {
        name: name,
        description: description
    });
}
