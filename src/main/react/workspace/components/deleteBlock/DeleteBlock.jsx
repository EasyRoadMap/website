import styles from "./style.module.css";
import Button from "../UI/Button.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import DeleteWorkspacePopup from "../popup/DeleteWorkspacePopup.jsx";


const TypeDeleleButton = {
  deleteProject: {
    title: "Удалить проект",
    description: "Все ваши данные о проекте будут безвозвратно удалены!",
  },
  deleteAccount: {
    title: "Удалить аккаунт",
    description: "Все ваши данные будут безвозвратно удалены!",
  },
  deleteWorkspace: {
    title: "Удалить рабочую область",
    description:
      "Все ваши данные о рабочей области будут безвозвратно удалены!",
  },
};

const DeleteButton = ({ typeButton }) => {
  const { DeleteWorkspace } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  const popupManager = usePopupManager();
  const onCloseDeleteWorkspacePopup = (...params) => {
    console.log(params?.[0]);
    if (params?.[0]?.button === "delete") {
      DeleteWorkspace(workspaceContext.id, params?.[0].password);
    }
  }

  const openDeleteWorkspacePopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: DeleteWorkspacePopup,
        props: workspaceContext?.info?.name,
      },
      onClose: onCloseDeleteWorkspacePopup,
    });
  };

  const data = TypeDeleleButton[typeButton];
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.title}>{data.title}</span>
          <span className={styles.description}>{data.description}</span>
        </div>

        <div>
          <Button text={data.title} type="outlineError" callback={openDeleteWorkspacePopup} />
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;
