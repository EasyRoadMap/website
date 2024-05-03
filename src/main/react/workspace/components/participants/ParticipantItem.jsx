import styles from "./styles.module.css";
import ParticipantActionsButton from "./ParticipantActionsButton.jsx";
import ParticipantsActionsProjectButton from "./ParticipantsActionsProjectButton.jsx";
import Button from "../UI/Button.jsx";
import CrownSVG from "../../../assets/crownSVG.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const ParticipantItem = ({ participant, type }) => {
  const avatarClassName = participant?.user?.photo?.default ? [styles.avatar, styles.pixelAvatar].join(" ") : styles.avatar;

  const { AbortInvite } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  const removeInvite = () => {
    AbortInvite(workspaceContext.id, participant.user.email);
  }

  return (
    <div className={styles.participantWrapper}>
      <img src={participant?.user?.photo?.url} alt="" className={avatarClassName} style={participant?.is_invited ? {opacity: "0.4"} : {}}/>
      <div className={styles.infoWrapper}>
        <div className={!participant?.is_invited ? styles.info : styles.infoInvite}>
          <div className={styles.inviteText}>
            <span className={styles.name}>{participant?.user?.name}</span>
            {participant?.is_admin && <CrownSVG style={{marginLeft: "6px"}}/>}
            {participant?.is_invited && <><div>•</div><div>Приглашен(-а)</div></>}
          </div>
          <div className={styles.position}>{participant?.is_admin ? "Администратор" : participant?.role}</div>
        </div>
        {(workspaceContext?.is_admin && !participant?.is_invited && !participant?.is_admin) && 
          (type === "project" ? <ParticipantsActionsProjectButton participant={participant}/>
          : <ParticipantActionsButton participant={participant}/>)
        }
        {participant?.is_invited && <Button text={"Отменить"} type={"outlineSecondary"} style={{width: "125px", height: "30px"}} callback={removeInvite}/>}
      </div>
    </div>
  );
};

export default ParticipantItem;
