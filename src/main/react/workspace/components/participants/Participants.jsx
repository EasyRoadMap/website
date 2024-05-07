import ParticipantsList from "./ParticipantsList.jsx";
import ParticipantItem from "./ParticipantItem.jsx";
import AddParticipantButton from "./AddParticipantButton.jsx";
import AddParticipantProjectButton from "./AddParticipantProjectButton.jsx";
import styles from "./styles.module.css";

const Participants = ({ participants, type }) => {
  console.log("kajsdasd");
  console.log(participants);
  return (
    <section className={styles.section} id="participants">
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
