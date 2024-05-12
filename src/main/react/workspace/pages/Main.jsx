import Base from "./Base.jsx";
import LinkVisitorPage from "../components/linkVisitorPage/linkVisitorPage.jsx";
import WorkspaceMainInfo from "../components/WorkspaceMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";

import useUserContext from "../hooks/useUserContext.js";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import UserInvitationPopup from "../components/popup/UserInvitationPopup.jsx";
import { getInvite } from "../api/workspace-api/getInvite.js";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CreateWorkspace from "./CreateWorkspace.jsx";

import qs from "qs";

const Main = ({ fromInvite = false }) => {
  const { workspaceContext } = useWorkspaceContext();
  const { userContext } = useUserContext();
  const { AcceptInvite, DeclineInvite } = useWorkspaceInfo();

  useEffect(() => {
    if (!fromInvite) return;

    const params = getQueryParam();
    if (!params?.invite_id) return;

    getInvite(params.invite_id)
      .then((response) => {
        openInvitationPopup({ invite: response.data });
      })
      .catch((e) => {
        console.log("response error");
        console.log(e);
      });
  }, []);

  const getQueryParam = () => {
    return qs.parse(location.search, { ignoreQueryPrefix: true });
  };

  const popupManager = usePopupManager();

  const onCloseInvitationPopup = (...params) => {
    if (
      params[0].button !== "decline" &&
      params[0].button !== "accept" &&
      !params[0].invite_id
    )
      return;

    if (params[0].button === "decline") {
      DeclineInvite(params[0].invite_id);
    } else if (params[0].button === "accept") {
      AcceptInvite(params[0].invite_id);
    }
  };

  const openInvitationPopup = (...params) => {
    popupManager.open(Popup, {
      popup: {
        component: UserInvitationPopup,
        props: {
          invite: params[0].invite,
        },
      },
      onClose: onCloseInvitationPopup,
    });
  };

  return (
    <>
      {workspaceContext?.info?.name ? (
        <Base>
          <WorkspaceMainInfo
            logo={workspaceContext?.photo}
            initialValues={{
              name: workspaceContext?.info?.name,
              description: workspaceContext?.info?.description,
              waitUntilLoadName: workspaceContext?.info?.name === null,
              waitUntilLoadDescription:
                workspaceContext?.info?.description === null,
              workspace: workspaceContext,
            }}
          />
          {console.debug("workspaceContext?.id", workspaceContext)}
          <LinkVisitorPage />
          <Participants
            participants={workspaceContext?.users}
            type={"workspace"}
          />
        </Base>
      ) : (
        <CreateWorkspace type={"workspace"} />
      )}
    </>
  );
};

export default Main;
