import ParticipantItem from "./ParticipantItem.jsx";
import styles from "./styles.module.css";

const ParticipantsList = ({
    participants
}) => {
    return (
        <div className={styles.participantsList}>
            {participants.map((participant, i) => {
                return (
                    <div key={i}>
                        <ParticipantItem participant={participant} />
                    </div>
                );
            })}
        </div>
    );
}

export default ParticipantsList;