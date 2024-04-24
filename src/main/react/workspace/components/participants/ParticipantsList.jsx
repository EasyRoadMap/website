import ParticipantItem from "./ParticipantItem.jsx";
import InviteParticipant from "./InviteParticipant.jsx";
import styles from "./styles.module.css";

const ParticipantsList = ({ participants }) => {
  return (
    <div className={styles.participantsList}>
      {participants.map((participant, i) => {
        return (
          <div key={i}>
            <ParticipantItem participant={participant} />
          </div>
        );
      })}
      <InviteParticipant participant={participants[0]} />
    </div>
  );
};

export default ParticipantsList;
