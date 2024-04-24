import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const ParticipantItem = ({ participant }) => {
  return (
    <div className={styles.participantWrapper}>
      <img src={participant.avatar} alt="" className={styles.avatar} />
      <div className={styles.infoWrapper}>
        <div className={styles.infoInvite}>
          <div className={styles.inviteText}>
            <div className={styles.name}>{participant.name}</div>
            <div>•</div>
            <div>Приглашен(-а)</div>
          </div>
          <div className={styles.position}>{participant.position}</div>
        </div>
        <Button text="Отменить" type="outlineSecondary" />
      </div>
    </div>
  );
};

export default ParticipantItem;
