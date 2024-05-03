import { PostMultipartQuery } from "../PostMultipartQuery";

export const addMember = (pr_id, email, role) => {
    const URL = "/api/v1/project/members/add";

    return PostMultipartQuery(URL, {
        email: email,
        role: role
    },
    {pr_id: pr_id}
);
}
