import axios from "axios";

export const signIn = (email, password, rememberMe) => {
    const URL = "/auth/sign-in";
    const TOKEN = document.getElementsByName("_csrf")[0].value;
    
    const bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("rememberMe", rememberMe);

    
    return axios({
        method: "post",
        url: URL,
        data: bodyFormData,
        headers: { 
          "X-CSRF-TOKEN": TOKEN,
          "Content-Type": "multipart/form-data" 
        },
    })
}
