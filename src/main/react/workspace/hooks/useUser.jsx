import { useState, useEffect } from "react";
import { getUser } from "../api/user-api/getUser.js";
import { deleteUser } from "../api/user-api/deleteUser.js";
import { updateUser } from "../api/user-api/updateUser.js";
import { getUserWorkspaces } from "../api/user-api/getUserWorkspaces.js";
import { getUserPhoto } from "../api/user-api/getUserPhoto.js";
import { getUserProjectsByWS } from "../api/user-api/getUserProjectsByWS.js";
import { getWSIDs } from "../utils/WSIDStorage.js";

import useUserContext from "./useUserContext.js";

export const useUserInfo = () => {
    const [user, setUser] = useState({});
    const [currentWorkspace, setCurrentWorkspace] = useState(null);

    const { setUserContext, setFirstAnswerReceived } = useUserContext();

    useEffect(() => {
        setUserContext((prev) => ({...prev, ...user}));
        setFirstAnswerReceived(true);
    }, [user, setUser]);

    useEffect(() => {
        if (currentWorkspace === null) return;
        setUserContext((prev) => ({...prev, currentWorkspace: currentWorkspace}));
    }, [currentWorkspace]);

    const getObjInArrayByItsValue = (arr, keyOfSearchedValue, value) => {
        return arr ? arr.find((el) => {
            return (el && el[keyOfSearchedValue] === value);
        }) : null;
    }

    const User = () => {
        getUser().then((response) => {
            console.log("response User");
            console.log(response);
            setUser((prev) => ({...prev, ...response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const DeleteUser = (password, onSuccess, onError) => {
        deleteUser(password).then((response) => {
            onSuccess();
        }).catch((e) => {
            console.log("error in useUser deleteUser");
            console.log(e);
            onError();
        });
    };

    const UpdateUser = (name, callback) => {
        updateUser(name).then((response) => {
            setUser((prev) => ({...prev, name: name}));
            if (callback) callback();
        }).catch((e) => {
            console.log("error in useUser updateUser");
            console.log(e);
        });
    }

    const Workspaces = (firstRequestCallback = false, chosenWS) => {
        getUserWorkspaces().then((response) => {
            console.log("response Workspaces");
            console.log(response);
            setUser((prev) => ({...prev, workspaces: response.data, workspacesReceived: true}));
            setUserContext((prev) => ({...prev, workspaces: response.data, workspacesReceived: true}));

            console.debug("here we gettig wsid");
            const last_visited_ws_ids = getWSIDs();
            const last_visited_ws_id = last_visited_ws_ids?.length > 0 ? last_visited_ws_ids[last_visited_ws_ids.length - 1] : null;
            console.debug("last_visited_ws_ids", last_visited_ws_ids, last_visited_ws_id, response.data);
            const last_visited_ws = last_visited_ws_id ? getObjInArrayByItsValue(response.data, "id", last_visited_ws_id) : null;

            if (firstRequestCallback) firstRequestCallback(last_visited_ws ? last_visited_ws : response.data?.[0]);
            if (chosenWS) {
                const ws = Object.keys(response.data).find(key => response.data[key] === chosenWS);
                firstRequestCallback(ws);
            }
        }).catch((e) => {
            console.log("error in useUser getUserWorkspaces");
            console.log(e);
        });
    }

    const getUserWorkspaceById = (ws_id) => {
        user.workspaces?.forEach((workspace) => {
            if (workspace?.id === ws_id) {
                return workspace;
            }
        })
    }

    // const setChosenWorkspace = (newWorkspaceId) => {
    //     console.log("am here with id ", newWorkspaceId);
    //     user.workspaces?.forEach((workspace) => {
    //         if (workspace?.id === newWorkspaceId) {
    //             console.log("found!");
    //             setUser((prev) => ({...prev, workspaceChosen: newWorkspaceId}));
    //             return;
    //         }
    //     })
    // }

    const Photo = () => {
        getUserPhoto().then((response) => {
            console.log("response Photo");
            setUser((prev) => ({...prev, photo: response.data}));
        }).catch((e) => {
            console.log("error in useUser getUserWorkspaces");
            console.log(e);
        });
    }

    // const Projects = (ws_id) => {
    //     getUserProjectsByWS(ws_id).then((response) => {
    //         setUser((prev) => ({...prev, : response.data}));
    //     }).catch((e) => {
    //         console.log("error in useUser getUserWorkspaces");
    //         console.log(e);
    //     });
    // }

    // TODO UpdatePhoto

    return { user, currentWorkspace, setCurrentWorkspace, User, DeleteUser, UpdateUser, Workspaces, Photo, getUserWorkspaceById };
}