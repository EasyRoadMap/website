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
import { kickMember } from "../api/workspace-api/kickMember.js"

import useWorkspaceContext from "./useWorkspaceContext.js";
import useUserContext from "./useUserContext.js";

import { useNavigate } from "react-router-dom";

export const useWorkspaceInfo = () => {
    const [workspace, setWorkspace] = useState();
    const { setCurrentWorkspace, Workspaces } = useUserInfo();
    const { currentWorkspace, setWorkspaceContext } = useWorkspaceContext();
    const { setUserContext } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        // setWorkspaceContext((prev) => ({...prev, isLoading: false}));
        setWorkspaceContext((prev) => ({...prev, ...workspace}));
    }, [workspace])

    const Workspace = (ws_id) => {
        getWorkspace(ws_id).then((response) => {
            console.log("WHAAAAAAAAAAT");
            console.log(currentWorkspace);
            setWorkspace((prev) => ({...prev, ...response.data}));
            setUserContext((prev) => ({...prev, currentWorkspace: ws_id}));
            setCurrentWorkspace((prev) => ({...prev, currentWorkspace: ws_id}));
            console.log({...currentWorkspace, currentWorkspace: ws_id});
        }).catch((e) => {
            setWorkspaceContext((prev) => ({...prev, workspaceExists: false}));
            console.log("response error");
            console.log(e);
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
        createWorkspace(name, description).then((workspace) => {
            getPhoto(workspace.data.id).then((photo) => {
                setWorkspace({...workspace.data, photo: photo.data});
                setWorkspaceContext({...workspace.data, photo: photo.data});
                Workspaces();
            }).catch((e) => {
                console.log("response error");
                console.log(e);
            })
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const DeleteWorkspace = (ws_id, password) => {
        deleteWorkspace(ws_id, password).then((response) => {
            setWorkspace({});
            setWorkspaceContext({})
            Workspaces();
            navigate("/workspace");
        }).catch((e) => {
            console.log("response error");
            console.log(e);
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
            console.log("response error");
            console.log(e);
        })
    }

    const GetAppearance = (ws_id) => {
        getAppearance(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, ...response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const Info = (ws_id) => {
        getInfo(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, info: response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const updateInfo = (ws_id, name, description) => {
        putInfo(ws_id, name, description).then((response) => {
            Info(ws_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const GetInviteInfo = (invite_id) => {
        getInvite(invite_id).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const SendInvite = (ws_id, email, role) => {
        sendInvite(ws_id, email, role).then((response) => {
            console.debug("sent invite");
            Members(ws_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const AbortInvite = (ws_id, email) => {
        abortInvite(ws_id, email).then((response) => {
            console.log(response);
            Members(ws_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const AcceptInvite = (invite_id) => {
        acceptInvite(invite_id).then((response) => {
            Workspaces();
            console.log(response);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const DeclineInvite = (invite_id) => {
        declineInvite(invite_id).then((response) => {
            Workspaces();
            console.log(response);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const LeaveWorkspace = (ws_id) => {
        leaveWorkspace(ws_id).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const Members = (ws_id) => {
        getWorkspaceMembers(ws_id).then((response) => {
            console.debug("members");
            setWorkspace((prev) => ({...prev, users: response.data}))
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const Projects = (ws_id) => {
        getProjects(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, projects: response.data}))
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const Photo = (ws_id) => {
        getPhoto(ws_id).then((response) => {
            setWorkspace((prev) => ({...prev, photo: response.data}))
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const TransferOwnership = (ws_id, email) => {
        transferOwnership(ws_id, email).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const KickMember = (ws_id, email) => {
        kickMember(ws_id, email).then((response) => {
            Members(ws_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    return { workspace, updateInfo, Workspace, checkWorkspace, CreateWorkspace, DeleteWorkspace, PutAppearance, TransferOwnership, KickMember, GetAppearance, SendInvite, LeaveWorkspace, Members, AbortInvite, Projects, GetInviteInfo, AcceptInvite, DeclineInvite, Photo };
}