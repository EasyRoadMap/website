import axios from "axios";

export const PostMultipartQuery = (URL, params = {}, query = {}) => {
    const checkedParams = {};
    if (params && Object.keys(params))
    Object.keys(params).forEach((key) => {
        (params[key] || params[key] === 0 || params[key] === false) ? checkedParams[key] = params[key] : null;
    });

    const bodyFormData = new FormData();
    Object.keys(checkedParams).forEach((key) => {
        console.debug("item", key, checkedParams[key]);
        bodyFormData.append(key, checkedParams[key]);
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