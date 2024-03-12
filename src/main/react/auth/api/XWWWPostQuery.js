import axios from "axios";
import qs from 'qs';

export const XWWWPostQuery = (URL, params) => {
    const TOKEN = document.getElementsByName("_csrf")[0].value;
    
    return axios({
        method: "post",
        url: URL,
        data: qs.stringify(params),
        headers: { 
          "X-CSRF-TOKEN": TOKEN,
          "Content-Type": "application/x-www-form-urlencoded"
        },
    })
    // TODO refactor this

}