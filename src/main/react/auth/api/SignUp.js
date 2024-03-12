import { XWWWPostQuery } from "./XWWWPostQuery";

export const signUp = (email, password, name) => {
    const URL = "/auth/sign-up";

    const data = { 
        email: email, 
        password: password, 
        name: name
    }

    return XWWWPostQuery(URL, data);
}
