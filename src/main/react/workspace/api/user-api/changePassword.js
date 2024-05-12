import { PutQuery } from "../PutQuery";

export const changePassword = (currentPassword, newPassword) => {
    const URL = "/api/v1/user/password";

    return PutQuery(URL, {
        currentPassword: currentPassword,
        newPassword: newPassword
    });
}
