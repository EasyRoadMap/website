import { PatchQuery } from "../PatchQuery";

export const updateMemberRole = (pr_id, email, role) => {
  const URL = "/api/v1/project/members/role";

  return PatchQuery(
    URL,
    {
      email: email,
      role: role,
    },
    { pr_id: pr_id }
  );
};
