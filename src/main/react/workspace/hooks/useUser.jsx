import { useState, useEffect } from "react";
import { getUser } from "../api/user-api/getUser.js";
import { deleteUser } from "../api/user-api/deleteUser.js";
import { updateUser } from "../api/user-api/updateUser.js";
import { getUserWorkspaces } from "../api/user-api/getUserWorkspaces.js";
import { getUserPhoto } from "../api/user-api/getUserPhoto.js";
import { getUserProjectsByWS } from "../api/user-api/getUserProjectsByWS.js";
import { getWSIDs } from "../utils/WSIDStorage.js";

import useErrorContext from "./useErrorContext.js";
import useUserContext from "./useUserContext.js";
import { getUserError } from "../errors/user_errors.js";

export const useUserInfo = () => {
    const [user, setUser] = useState({});
    const [currentWorkspace, setCurrentWorkspace] = useState(null);

    const { pushError } = useErrorContext();
    const { setUserContext, setFirstAnswerReceived } = useUserContext();

    useEffect(() => {
        setUserContext((prev) => ({...prev, ...user}));
        setFirstAnswerReceived(true);
    }, [user, setUser]);

    useEffect(() => {
        if (currentWorkspace === null) return;
        setUserContext((prev) => ({...prev, currentWorkspace: currentWorkspace}));
    }, [currentWorkspace]);

    const handleError = (e) => {
        const error_message = getUserError(e?.response?.data?.error_code);
        pushError(error_message, "error");
    }

    const getObjInArrayByItsValue = (arr, keyOfSearchedValue, value) => {
        return arr ? arr.find((el) => {
            return (el && el[keyOfSearchedValue] === value);
        }) : null;
    }

    const User = () => {
        getUser().then((response) => {
            setUser((prev) => ({...prev, ...response.data}));
        }).catch((e) => {
            handleError(e);
        });
    }

    const DeleteUser = (password, onSuccess, onError) => {
        deleteUser(password).then((response) => {
            onSuccess();
        }).catch((e) => {
            handleError(e);
            onError();
        });
    };

    const UpdateUser = (name, callback) => {
        updateUser(name).then((response) => {
            setUser((prev) => ({...prev, name: name}));
            if (callback) callback();
        }).catch((e) => {
            handleError(e);
        });
    }

    const Workspaces = (firstRequestCallback = false, chosenWS) => {
        getUserWorkspaces().then((response) => {
            setUser((prev) => ({...prev, workspaces: response.data, workspacesReceived: true}));
            setUserContext((prev) => ({...prev, workspaces: response.data, workspacesReceived: true}));

            const last_visited_ws_ids = getWSIDs();
            const last_visited_ws_id = last_visited_ws_ids?.length > 0 ? last_visited_ws_ids[last_visited_ws_ids.length - 1] : null;
            const last_visited_ws = last_visited_ws_id ? getObjInArrayByItsValue(response.data, "id", last_visited_ws_id) : null;

            if (chosenWS) {
                const ws = Object.keys(response.data).find(key => response.data[key] === chosenWS);
                firstRequestCallback(ws);
            } else {
                if (firstRequestCallback) firstRequestCallback(last_visited_ws ? last_visited_ws : response.data?.[0]);
            }
        }).catch((e) => {
            handleError(e);
        });
    }

    const getUserWorkspaceById = (ws_id) => {
        user.workspaces?.forEach((workspace) => {
            if (workspace?.id === ws_id) {
                return workspace;
            }
        })
    }

    const Photo = () => {
        getUserPhoto().then((response) => {
            setUser((prev) => ({...prev, photo: response.data}));
        }).catch((e) => {
            handleError(e);
        });
    }

    return { user, currentWorkspace, setCurrentWorkspace, User, DeleteUser, UpdateUser, Workspaces, Photo, getUserWorkspaceById };
}