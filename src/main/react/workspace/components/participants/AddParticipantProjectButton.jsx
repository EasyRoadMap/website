import styles from "./styles.module.css";
import AddPersonSVG from "../../../assets/addPerson.jsx";

import { usePopupManager } from "react-popup-manager";
import Button from "../UI/Button.jsx";
import Popup from "../popup/Popup.jsx";
import AddUser from "../popup/AddUser.jsx";
import AddUserPlaceholder from "../popup/AddUserPlaceholder.jsx";

import useUserContext from "../../hooks/useUserContext.js";
import { useProjectInfo } from "../../hooks/useProject.jsx";
import useProjectContext from "../../hooks/useProjectContext.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { getAttachableMembers } from "../../api/project-api/getAttachableMembers.js";
import { useEffect, useState } from "react";

const AddParticipantProjectButton = () => {
  const popupManager = usePopupManager();
  const { workspaceContext } = useWorkspaceContext();
  const { AddMember } = useProjectInfo();
  const { projectId, projectContext } = useProjectContext();
  const { userContext } = useUserContext();
  // const { workspaceContext } = useWorkspaceContext();

  const onSendInvite = (...params) => {
    const membersChosen = params[0].membersChosen;
    const button = params[0].button;

    if (button !== "invite" || !membersChosen || !projectId) return;
    console.log("sending invite", params);
    AddMember(projectId, membersChosen);
  };

  const openSendInvitePopup = (...params) => {
    if (!projectContext?.id || !userContext?.email) return;

    getAttachableMembers(projectContext.id)
      .then((response) => {
        let attachableMembers = null;

        attachableMembers = response.data;
        if (response.status === 204) {
          attachableMembers = [];
        }

        if (attachableMembers === null) return;
        if (attachableMembers?.length === 0) {
          popupManager.open(Popup, {
            popup: {
              component: AddUserPlaceholder,
            },
            onClose: () => {},
          });
          return;
        }

        popupManager.open(Popup, {
          popup: {
            component: AddUser,
            props: {
              workspaceMembers: attachableMembers,
              adminEmail: userContext.email,
            },
          },
          onClose: onSendInvite,
        });
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {workspaceContext?.is_admin && (
        <>
          {screenWidth < 1600 && (
            <button className={styles.addButton} onClick={openSendInvitePopup}>
              <div className={styles.addLogo}>
                <AddPersonSVG className={styles.addPersonSVG} />
              </div>
              <div className={styles.addUser}>Добавить участника</div>
            </button>
          )}

          {screenWidth >= 1600 && (
            <Button
              text="Добавить участника"
              type="outlineAccent"
              callback={openSendInvitePopup}
              style={{
                height: "48px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default AddParticipantProjectButton;
