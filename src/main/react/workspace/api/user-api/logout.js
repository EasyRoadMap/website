import { XWWWPostQuery } from "../XWWWPostQuery";

export const logout = () => {
    const URL = "/auth/logout";

    console.log("logout");
    return XWWWPostQuery(URL);
}
