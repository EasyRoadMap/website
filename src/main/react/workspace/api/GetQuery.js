import axios from "axios";

export const GetQuery = (URL, params = {}) => {
    console.log("params");
    console.log(params);

    return axios({
        method: "get",
        url: URL,
        params: {
            ...params
        }
    })
}