import styles from "./styles.module.css";
import ParticipantActionsButton from "./ParticipantActionsButton.jsx";

const ParticipantItem = ({ participant }) => {
  return (
    <div className={styles.participantWrapper}>
      <img src={participant.avatar} alt="" className={styles.avatar} />
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <div>{participant.name}</div>
          <div className={styles.position}>{participant.position}</div>
        </div>
        <ParticipantActionsButton />
      </div>
    </div>
  );
};

export default ParticipantItem;
