import axios from "axios";
import qs from 'qs';

export const PatchQuery = (URL, params, query) => {
    const TOKEN = document.getElementsByName("_csrf")[0].value;
    
    return axios({
        method: "patch",
        url: URL,
        data: qs.stringify(params),
        headers: { 
          "X-CSRF-TOKEN": TOKEN,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: new URLSearchParams(query)
    })
    // TODO refactor this

}