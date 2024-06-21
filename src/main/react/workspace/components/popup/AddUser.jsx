import styles from "./AddUserPopup.module.css";
import InputCheckBoxAddUser from "../UI/InputCheckBoxAddUser.jsx";
import Button from "../UI/Button.jsx";

import { useEffect, useState } from "react";

const AddUser = ({ close, workspaceMembers, adminEmail }) => {
  console.debug("workspaceMembers", workspaceMembers);
  const [membersChosen, setMembersChosen] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "invite")
      return;
    close({ button: nameButtonClicked, membersChosen: membersChosen });
  };

  const avatarClassName = (isDefaultPhoto) =>
    isDefaultPhoto
      ? [styles.participantAvatar, styles.pixelAvatar].join(" ")
      : styles.participantAvatarUser;

  const toggleUser = (email) => {
    if (membersChosen.includes(email)) {
      const filtratedMembers = membersChosen.filter(
        (member) => member !== email
      );
      setMembersChosen(filtratedMembers);
    } else {
      setMembersChosen([...membersChosen, email]);
    }
  };

  return (
    <>
      <div className={styles.AddUserContainer}>
        <div className={styles.AddUserContainerInfo}>
          <h1 className={styles.title}>Добавить участника </h1>
          <span className={styles.AddUserDescription}>
            Вы можете добавить в проект сразу нескольких{" "}
            {screenWidth >= 400 && <br />}
            участников из рабочей области.
          </span>
          {workspaceMembers &&
            workspaceMembers?.length > 0 &&
            workspaceMembers?.map(
              (user, i) =>
                user?.user?.email !== adminEmail && (
                  <div className={styles.AddUserWrapperScroll}>
                    <div className={styles.AddUserWrapperCard}>
                      <div className={styles.AddUserWrapper}>
                        <div className={styles.AddUserInfoWrapper}>
                          <img
                            src={user?.user?.photo?.url}
                            alt=""
                            className={avatarClassName(
                              user?.user?.photo?.default
                            )}
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
                              {user?.user?.name}
                            </div>
                            <div className={styles.AddUserPosition}>
                              {user?.role}
                            </div>
                          </div>
                        </div>
                        <InputCheckBoxAddUser
                          id={i}
                          email={user?.user?.email}
                          toggleUser={toggleUser}
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          <span className={styles.AddUserCount}>
            Пользователей выбрано:{" "}
            {" " + membersChosen.length + " из " + workspaceMembers.length}
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
            callback={() => handleClick("invite")}
            style={{ width: "144px", height: "40px" }}
          />
        </div>
      </div>
    </>
  );
};
export default AddUser;
