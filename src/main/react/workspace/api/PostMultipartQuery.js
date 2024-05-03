import axios from "axios";

export const PostMultipartQuery = (URL, params = {}, query = {}) => {
    const bodyFormData = new FormData();
    Object.keys(params).forEach((key) => {
        bodyFormData.append(key, params[key]);
    })

    return axios({
        method: "get",
        url: URL,
        body: bodyFormData,
        params: query,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}