import { XWWWPostQuery } from "../XWWWPostQuery";

export const addMember = (pr_id, email, role) => {
    const URL = "/api/v1/project/members/add";

    return XWWWPostQuery(URL, {
        email: email,
        role: role
    },
    {pr_id: pr_id}
);
}
