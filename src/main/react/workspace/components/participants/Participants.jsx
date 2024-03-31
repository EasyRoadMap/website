import ParticipantsList from "./ParticipantsList.jsx";
import AddParticipantButton from "./AddParticipantButton.jsx";
import styles from "./styles.module.css";

const Participants = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
                Участники
            </h1>
            <ParticipantsList participants={[
                {avatar: "", name: "Имя пользователя 1", position: "Администратор", transferControl: () => {}, exclude: () => {}},
                {avatar: "", name: "Имя пользователя 2", position: "Разработчик", transferControl: () => {}, exclude: () => {}},
            ]}/>
            <AddParticipantButton />
        </section>
    );
}

export default Participants;