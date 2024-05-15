import styles from "./AddUserPopup.module.css";
import InputCheckBoxAddUser from "../UI/InputCheckBoxAddUser.jsx";
import Button from "../UI/Button.jsx";
const AddUserPlaceholder = () => {
  //   const avatarClassName = participant?.user?.photo?.default
  //     ? [styles.participantAvatar, styles.pixelAvatar].join(" ")
  //     : styles.participantAvatar;
  return (
    <>
      <div className={styles.AddUserContainer}>
        <div className={styles.AddUserContainerInfo}>
          <h1 className={styles.title}>Добавить участника </h1>
          <span className={styles.AddUserDescription}>
            Вы можете добавить в проект сразу нескольких <br /> участников из
            рабочей области.
          </span>
          <div className={styles.AddUserWrapperScroll}>
            <div className={styles.AddUserWrapperCard}>
              <div className={styles.AddUserWrapper}>
                <div className={styles.AddUserInfoWrapper}>
                  <img
                    //   src={participant?.user?.photo?.url}
                    //   alt=""
                    //   className={avatarClassName}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div className={styles.AddUserTextWrapper}>
                    <div className={styles.AddUserName}>
                      {/* {participant?.user?.name} */}Имя пользователя
                    </div>
                    <div className={styles.AddUserPosition}>
                      {/* {participant?.role} */}Роль
                    </div>
                  </div>
                </div>
                <InputCheckBoxAddUser id={"1"} />
              </div>
            </div>
          </div>
          <span className={styles.AddUserCount}>
            Пользователей выбрано: n из n
          </span>
        </div>
        <div className={styles.AddUserButtonWrapper}>
          <Button
            text="Отмена"
            type="outlineSecondary"
            callback={() => handleClick("cancel")}
            style={{ width: "131px", height: "40px" }}
          />
          <Button
            text="Добавить"
            type="filledAccent"
            callback={() => handleClick("create")}
            style={{ width: "144px", height: "40px" }}
          />
        </div>
      </div>
    </>
  );
};
export default AddUserPlaceholder;
