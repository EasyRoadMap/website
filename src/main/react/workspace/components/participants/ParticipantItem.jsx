import styles from "./styles.module.css";

const ParticipantItem = ({ participant }) => {
  return (
    <div className={styles.participantWrapper}>
      <img src={participant.avatar} alt="" className={styles.avatar} />
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <div>{participant.name}</div>
          <div className={styles.position}>{participant.position}</div>
        </div>
        <div>
          точки
          {/* Кнопка действий с участником */}
        </div>
      </div>
    </div>
  );
};

export default ParticipantItem;
