import axios from "axios";
import qs from 'qs';

export const PutQuery = (URL, params, query, isArray=false) => {
    const TOKEN = document.getElementsByName("_csrf")[0].value;
    
    return axios({
        method: "put",
        url: URL,
        data: isArray ? qs.stringify(params, { arrayFormat: 'comma', encode: false  }) : qs.stringify(params),
        headers: { 
          "X-CSRF-TOKEN": TOKEN,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: new URLSearchParams(query)
    })
    // TODO refactor this

}