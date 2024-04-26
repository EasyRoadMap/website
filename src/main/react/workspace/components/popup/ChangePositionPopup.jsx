import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";

const ChangePositionPopup = ({ close, participant }) => {
  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "change")
      return;
    close(nameButtonClicked);
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Изменить должность</h1>
        <div className={styles.participantCard}>
          <div className={styles.participantCardWrapper}>
            <img src="" alt="" className={styles.participantAvatar} />
            <div className={styles.participantCardTextWrapper}>
              <div className={styles.participantCardTitle}>
                {participant?.user?.name}
              </div>
              <div className={styles.participantCardPosition}>
                {participant?.role}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerInput}>
          <div className={styles.description}>
            Вы можете назначить должность данному <br />
            пользователю в поле ниже.
          </div>
          <Input placeholder={"Введите должность"} typeOfInput={"position"} />
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Изменить"
          type="filledAccent"
          callback={() => handleClick("change")}
          style={{ width: "146px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default ChangePositionPopup;
