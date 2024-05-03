import { PutQuery } from "../PutQuery";
import qs from "qs";

export const updateLinks = (pr_id, name, url) => {
    console.debug("trynig send request with params", name, url);
    console.debug("qs stringify", qs.stringify({name, url}));
    const URL = "/api/v1/project/links";

    return PutQuery(URL, {
        name: name,
        url: url
    },
    {pr_id: pr_id},
    true
);
}