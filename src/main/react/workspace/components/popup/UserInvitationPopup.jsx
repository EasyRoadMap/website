import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";

const UserInvitationPopup = ({ close, invite }) => {
  const avatarClassName = invite?.workspace?.photo?.default
    ? [styles.participantAvatar, styles.pixelAvatar].join(" ")
    : styles.participantAvatar;

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "decline" && nameButtonClicked !== "accept")
      return;
    close({ button: nameButtonClicked, invite_id: invite.id });
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Приглашение в рабочую область</h1>
        <div className={styles.description}>
          Вы получили приглашение в
          <span className={styles.descriptionBolder}>
            {" " + invite?.workspace?.name + " "}
          </span>{" "}
          <br />
          от администратора
          <span className={styles.descriptionBolder}>
            {" " + invite?.inviter?.name + " "}
          </span>{" "}
        </div>
        <div className={styles.participantCard}>
          <div className={styles.participantCardWrapper}>
            <img src={invite?.workspace?.photo?.url} alt="" className={avatarClassName} />
            <div className={styles.participantCardTextWrapper}>
              <div className={styles.participantCardTitle}>
                {invite?.workspace?.name}
              </div>
              {/* <div className={styles.participantCardPosition}>
                {participant?.role}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отклонить"
          type="outlineAccent"
          callback={() => handleClick("decline")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Принять"
          type="filledAccent"
          callback={() => handleClick("accept")}
          style={{ width: "146px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default UserInvitationPopup;
