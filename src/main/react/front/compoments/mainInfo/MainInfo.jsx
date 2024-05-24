import styles from "./style.module.css";

const MainInfo = ({ name, description, photo }) => {
  const avatarClassName = photo?.default
    ? [styles.projectAvatar, styles.pixelAvatar].join(" ")
    : styles.projectAvatarUser;

  return (
    <div className={styles.mainInfo}>
      <img src={photo?.url} alt="" className={avatarClassName}></img>
      <div className={styles.infoWrapper}>
        <span className={styles.infoTitle}>{name}</span>
        <span className={styles.infoDescription}>{description}</span>
      </div>
    </div>
  );
};

export default MainInfo;
