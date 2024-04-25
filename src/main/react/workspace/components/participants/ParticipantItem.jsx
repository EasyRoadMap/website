import styles from "./styles.module.css";
import ParticipantActionsButton from "./ParticipantActionsButton.jsx";
import Button from "../UI/Button.jsx";
import CrownSVG from "../../../assets/crownSVG.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useUserContext from "../../hooks/useUserContext.js";

const ParticipantItem = ({ participant }) => {
  const avatarClassName = participant?.user?.photo?.default ? [styles.avatar, styles.pixelAvatar].join(" ") : styles.avatar;

  const { AbortInvite } = useWorkspaceInfo();
  const { user } = useUserContext();

  const removeInvite = () => {
    AbortInvite(user.currentWorkspace.id, participant.user.email);
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
        {(participant?.is_admin && !participant?.is_invited) && <ParticipantActionsButton participant={participant}/>}
        {participant?.is_invited && <Button text={"Отменить"} type={"outlineSecondary"} style={{width: "125px", height: "30px"}} callback={removeInvite}/>}
      </div>
    </div>
  );
};

export default ParticipantItem;
