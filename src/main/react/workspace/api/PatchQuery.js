import axios from "axios";
import qs from 'qs';

export const PatchQuery = (URL, params, query) => {
    const TOKEN = document.getElementsByName("_csrf")[0].value;

    const checkedParams = {};

    if (params && Object.keys(params))
    Object.keys(params).forEach((key) => {
      (params[key] || params[key] === 0 || params[key] === false) ? checkedParams[key] = params[key] : null;
    });
    
    return axios({
        method: "patch",
        url: URL,
        data: qs.stringify(checkedParams),
        headers: { 
          "X-CSRF-TOKEN": TOKEN,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: new URLSearchParams(query)
    })
    // TODO refactor this

}