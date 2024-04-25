import { PutQuery } from "../PutQuery.js"

export const putAppearance = (ws_id, theme, accentColor) => {
    const URL = "/api/v1/workspace/appearance";

    return PutQuery(URL, {
        theme: theme,
        accentColor: accentColor
    },
    {
       ws_id: ws_id 
    });
}
