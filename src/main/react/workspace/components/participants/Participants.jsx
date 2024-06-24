import ParticipantsList from "./ParticipantsList.jsx";
import ParticipantItem from "./ParticipantItem.jsx";
import AddParticipantButton from "./AddParticipantButton.jsx";
import AddParticipantProjectButton from "./AddParticipantProjectButton.jsx";
import styles from "./styles.module.css";

const Participants = ({ participants, type }) => {
  return (
    <section className={styles.section} id="participants">
      <div className={styles.participantsListWrapper}>
        <h1 className={styles.title}>Участники</h1>
        <div className={styles.participantsList}>
          {participants &&
            participants.map((participant, i) => {
              return (
                //   <div key={i}>
                <ParticipantItem participant={participant} type={type} />
                //   </div>
              );
            })}
        </div>
      </div>
      <div>
        {type === "project" ? (
          <AddParticipantProjectButton />
        ) : (
          <AddParticipantButton />
        )}
      </div>
    </section>
  );
};

export default Participants;
