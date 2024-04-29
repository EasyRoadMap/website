import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

const UpdateProfilePopup = ({ workspaceName, close }) => {
  const [name, setName] = useState("");

  console.log("propd");
  console.log(workspaceName);

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "save") return;
    close({ button: nameButtonClicked, name: name });
  };
  return (
    <>
      <div className={styles.containerWithUser}>
        <h1 className={styles.title}>Мой профиль</h1>

        <div className={styles.containerInfoUser}>
          <div src="" alt="" className={styles.UserAvatar}></div>
          <div className={styles.containerWithInputUser}>
            <Input
              data={name}
              setData={setName}
              placeholder={"Ваше имя"}
              typeOfInput={"name"}
            />
            <div className={styles.descriptionUser}>
              <span>
                Введите имя и загрузите фото, они будут <br /> отображаться в
                интерфейсе <span className={styles.bolder}>EasyRoadMap</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Сохранить изменения"
          type="filledAccent"
          callback={() => handleClick("save")}
          style={{ width: "265px", height: "40px", padding: "0" }}
        />
      </div>
    </>
  );
};

export default UpdateProfilePopup;
