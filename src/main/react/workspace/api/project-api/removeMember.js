import { XWWWPostQuery } from "../XWWWPostQuery";

export const removeMember = (pr_id, email) => {
    const URL = "/api/v1/project/members/remove";

    return XWWWPostQuery(URL, {
        email: email
    },
    {pr_id: pr_id}
);
}
