import { PutQuery } from "../PutQuery.js"

export const putInfo = (ws_id, name, description) => {
    const URL = "/api/v1/workspace/info";

    return PutQuery(URL, {
        name: name,
        description: description
    },
    {
       ws_id: ws_id 
    });
}
