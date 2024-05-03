import { PostMultipartQuery } from "../PostMultipartQuery";

export const removeMember = (pr_id, email) => {
    const URL = "/api/v1/project/members/remove";

    return PostMultipartQuery(URL, {
        email: email
    },
    {pr_id: pr_id}
);
}
