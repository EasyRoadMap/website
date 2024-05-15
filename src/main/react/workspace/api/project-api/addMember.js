import { XWWWPostQuery } from "../XWWWPostQuery";

export const addMember = (pr_id, email) => {
    const URL = "/api/v1/project/members/add";

    return XWWWPostQuery(URL, {
        email: email
    },
    {pr_id: pr_id},
    true
);
}
