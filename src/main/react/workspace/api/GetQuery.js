import axios from "axios";

export const GetQuery = (URL, params = {}) => {
    return axios({
        method: "get",
        url: URL,
        params: {
            ...params
        }
    })
}