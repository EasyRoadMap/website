import ParticipantsList from "./ParticipantsList.jsx";
import ParticipantItem from "./ParticipantItem.jsx";
import AddParticipantButton from "./AddParticipantButton.jsx";
import styles from "./styles.module.css";

const Participants = ({participants, type}) => {
    console.log("kajsdasd");
    console.log(participants);
    return (
        <section className={styles.section} id="participants">
            <h1 className={styles.title}>
                Участники
            </h1>
            <div className={styles.participantsList}>
                {(participants) && participants.map((participant, i) => {
                    const participantItem = participant;
                    if (type === "project") {
                        participantItem.is_admin = false;
                        participantItem.is_invited = false;
                    }
                    return (
                        <div key={i}>
                            <ParticipantItem participant={participantItem} />
                        </div>
                    );
                })}
            </div>
            
            {/* {avatar: "", name: "Имя пользователя 1", position: "Администратор", transferControl: () => {}, exclude: () => {}},
            {avatar: "", name: "Имя пользователя 2", position: "Разработчик", transferControl: () => {}, exclude: () => {}}, */}
            <AddParticipantButton />
        </section>
    );
}

export default Participants;