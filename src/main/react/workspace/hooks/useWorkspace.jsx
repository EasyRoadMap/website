import { useState, useEffect } from "react";
import { RGBAToInt, IntToRGBA } from "../utils/RGBAToIntConverter.js";
import { getWorkspace } from "../api/workspace-api/getWorkspace.js";
import { createWorkspace } from "../api/workspace-api/createWorkspace.js";
import { user, useUserInfo } from "./useUser.jsx";
import { deleteWorkspace } from "../api/workspace-api/deleteWorkspace.js";
import { putAppearance } from "../api/workspace-api/putAppearance.js";
import { getAppearance } from "../api/workspace-api/getAppearance.js";
import { putInfo } from "../api/workspace-api/putInfo.js";
import { getInfo } from "../api/workspace-api/getInfo.js";
import { getInvite } from "../api/workspace-api/getInvite.js";
import { sendInvite } from "../api/workspace-api/sendInvite.js";
import { acceptInvite } from "../api/workspace-api/acceptInvite.js";
import { declineInvite } from "../api/workspace-api/declineInvite.js";
import { abortInvite } from "../api/workspace-api/abortInvite.js";
import { leaveWorkspace } from "../api/workspace-api/leaveWorkspace.js";
import { getWorkspaceMembers } from "../api/workspace-api/getWorkspaceMembers.js";
import { getProjects } from "../api/workspace-api/getProjects.js";
import { getPhoto } from "../api/workspace-api/getPhoto.js"
import { transferOwnership } from "../api/workspace-api/transferOwnership.js";
import { kickMember } from "../api/workspace-api/kickMember.js";
import { updateMemberRole } from "../api/workspace-api/updateMemberRole.js";

import useWorkspaceContext from "./useWorkspaceContext.js";
import useUserContext from "./useUserContext.js";

import { useNavigate } from "react-router-dom";
import WorkspaceContext from "../context/WorkspaceContextProvider.js";

import { initWorkspace } from "./InitWorkspace.js";
import { addWSID, removeWSID } from "../utils/WSIDStorage.js";

import { getWorkspaceError } from "../errors/workspace_errors.js";
import useErrorContext from "./useErrorContext.js";

export const useWorkspaceInfo = () => {
    const [workspace, setWorkspace] = useState();
    const { setCurrentWorkspace, Workspaces } = useUserInfo();
    const { currentWorkspace, workspaceContext, setWorkspaceContext } = useWorkspaceContext();
    const { setUserContext } = useUserContext();
    const { pushError } = useErrorContext();

    const navigate = useNavigate();

    useEffect(() => {
        setWorkspaceContext((prev) => ({...prev, ...workspace}));
    }, [workspace]);

    const handleError = (e) => {
        const error_message = getWorkspaceError(e?.response?.data?.error_code);
        pushError(error_message, "error");
    }

    const Workspace = (ws_id, resetPrevious=false) => {
        getWorkspace(ws_id).then((response) => {
            if (resetPrevious) {
                setWorkspaceContext({...response.data, workspaceExists: true});
                setUserContext((prev) => ({...prev, currentWorkspace: ws_id}));
                setCurrentWorkspace((prev) => ({currentWorkspace: ws_id}));
                return;
            }
            setWorkspaceContext((prev) => ({...prev, ...response.data, workspaceExists: true}));
            setUserContext((prev) => ({...prev, currentWorkspace: ws_id}));
            setCurrentWorkspace((prev) => ({...prev, currentWorkspace: ws_id}));
        }).catch((e) => {
            setWorkspaceContext((prev) => ({...prev, workspaceExists: false}));
            handleError(e);
        })
    }

    const checkWorkspace = (ws_id) => {
        getWorkspace(ws_id).then((response) => {
            setWorkspaceContext((prev) => ({...prev, workspaceExists: true}));
        }).catch((e) => {
            setWorkspaceContext((prev) => ({...prev, workspaceExists: false}));
        });
    }

    const CreateWorkspace = (name, description) => {
        if (description && description.length === 0) {
            description = null;
        }
        createWorkspace(name, description).then((workspace) => {
            if (workspace?.data?.id) addWSID(workspace.data.id);
            getPhoto(workspace.data.id).then((photo) => {
                navigate({
                    pathname: "/workspace",
                    search: "?ws_id=" + workspace.data.id,
                });
                setWorkspace({...workspace.data, photo: photo.data});
                setWorkspaceContext({...workspace.data, photo: photo.data});
                Workspaces((newWS) => {
                    initWorkspace(
                    (ws, reset) => Workspace(ws, reset),
                    (ws) => Members(ws),
                    (ws) => Projects(ws),
                    newWS.id
                )});
            }).catch((e) => {
                handleError(e);
            })
        }).catch((e) => {
            handleError(e);
        })
    }

    const DeleteWorkspace = (ws_id, password) => {
        deleteWorkspace(ws_id, password).then((response) => {
            removeWSID(ws_id);
            setWorkspace({});
            setWorkspaceContext({})
            Workspaces();
            navigate("/workspace");
        }).catch((e) => {
            handleError(e);
        })
    }

    const PutAppearance = (ws_id, theme, accentColor) => {
        const accentColorInt = RGBAToInt(accentColor.r, accentColor.g, accentColor.b, accentColor.a);
        putAppearance(ws_id, theme, accentColorInt).then((response) => {
            setWorkspace((prev) => ({...prev, appearance: {
                "theme": theme,
                "accent_color": accentColorInt
            }}));
        }).catch((e) => {
            handleError(e);
        })
    }

    const GetAppearance = (ws_id) => {
        getAppearance(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, ...response.data}));
        }).catch((e) => {
            handleError(e);
        })
    }

    const Info = (ws_id) => {
        getInfo(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, info: response.data}));
        }).catch((e) => {
            handleError(e);
        })
    }

    const updateInfo = (ws_id, name, description) => {
        if (description && description.length === 0) {
            description = null;
        }
        putInfo(ws_id, name, description).then((response) => {
            Info(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const GetInviteInfo = (invite_id) => {
        getInvite(invite_id).then((response) => {
            console.log(response);
        }).catch((e) => {
            handleError(e);
        })
    }

    const SendInvite = (ws_id, email, role) => {
        sendInvite(ws_id, email, role).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const AbortInvite = (ws_id, email) => {
        abortInvite(ws_id, email).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const AcceptInvite = (invite_id, ws_id) => {
        acceptInvite(invite_id).then((response) => {
            navigate({
                pathname: "/workspace",
                search: "?ws_id=" + ws_id,
            });
            Workspaces();
            Workspace(ws_id, true);
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const DeclineInvite = (invite_id) => {
        declineInvite(invite_id).then((response) => {
            Workspaces();
        }).catch((e) => {
            handleError(e);
        })
    }

    const LeaveWorkspace = (ws_id) => {
        leaveWorkspace(ws_id).then((response) => {
            removeWSID(ws_id);
            setWorkspace({});
            setWorkspaceContext({})
            Workspaces();
            navigate("/workspace");
        }).catch((e) => {
            handleError(e);
        })
    }

    const Members = (ws_id) => {
        getWorkspaceMembers(ws_id).then((response) => {
            setWorkspaceContext((prev) => ({...prev, users: response.data}))
        }).catch((e) => {
            handleError(e);
        })
    }

    const Projects = (ws_id) => {
        if (!ws_id) return;
        getProjects(ws_id).then((response) => {
            setWorkspaceContext((prev) => ({...prev, projects: response.data}))
        }).catch((e) => {
            handleError(e);
        })
    }

    const Photo = (ws_id) => {
        getPhoto(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, photo: response.data}))
        }).catch((e) => {
            handleError(e);
        })
    }

    const TransferOwnership = (ws_id, email) => {
        transferOwnership(ws_id, email).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const KickMember = (ws_id, email) => {
        kickMember(ws_id, email).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const UpdateMemberRole = (ws_id, email, role) => {
        updateMemberRole(ws_id, email, role).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    return { workspace, updateInfo, Workspace, checkWorkspace, CreateWorkspace, DeleteWorkspace, UpdateMemberRole, PutAppearance, TransferOwnership, KickMember, GetAppearance, SendInvite, LeaveWorkspace, Members, AbortInvite, Projects, GetInviteInfo, AcceptInvite, DeclineInvite, Photo };
}