import Button from "../UI/Button.jsx";
import styles from "./styles.module.css";

const DropdownUser = ({ user }) => {
  return (
    <div className={styles.userDropdown}>
      <img src={user.avatar} alt="" className={styles.avatar} />
      <div className={styles.userInfoWrapper}>
        <h1 className={styles.userName}>{user.name}</h1>
        <div className={styles.userEmail}>{user.email}</div>
        <Button
          text="Мой профиль"
          type="outlineAccent"
          className={styles.userButton}
        />
      </div>
    </div>
  );
};

export default DropdownUser;
