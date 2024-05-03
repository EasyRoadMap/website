import axios from "axios";

export const PostMultipartQuery = (URL, params = {}, query = {}) => {
    const bodyFormData = new FormData();
    Object.keys(params).forEach((key) => {
        console.debug("item", key, params[key]);
        bodyFormData.append(key, params[key]);
    })

    return axios({
        method: "post",
        url: URL,
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        params: query
    })
}