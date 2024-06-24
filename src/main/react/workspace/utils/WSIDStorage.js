const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const remove = (key) => {
    localStorage.removeItem(key);
}

const filterArray = (arr, valueToRemove) => {
    if (arr && arr.length > 0) return arr.filter((prev) => {
        return prev != valueToRemove;
    });
    return null;
}

export const getWSIDs = () => {
    return get("last_visited_ws_ids");
}

export const addWSID = (ws_id) => {
    if (!ws_id) {
        return;
    }
    const prev_ws_ids = getWSIDs();
    const filtered_ws_ids = prev_ws_ids ? filterArray(prev_ws_ids, ws_id) : null;
    const arrayWithAddedWSID = filtered_ws_ids ? [...filtered_ws_ids, ws_id] : [ws_id];
    return save("last_visited_ws_ids", arrayWithAddedWSID);
}

export const removeWSID = (ws_id) => {
    const prev_ws_ids = getWSIDs();
    const filtered_ws_ids = filterArray(prev_ws_ids, ws_id);
    return save("last_visited_ws_ids", filtered_ws_ids);
}