import styles from "./style.module.css";
import LinkSVG from "../../../assets/linkSVG.jsx";

const ProjectInfo = ({
  name,
  description,
  links,
  photo
}) => {
  const avatarClassName = photo?.default
    ? [styles.projectAvatar, styles.pixelAvatar].join(" ")
    : styles.projectAvatar;

  return (
    <div className={styles.mainInfo}>
      <img src={photo?.url} alt="" className={avatarClassName}></img>
      <div className={styles.infoWrapper}>
        <span className={styles.infoTitle}>{name}</span>
        <span className={styles.infoDescription}>{description}</span>
        <div className={styles.infoLinkWrapper}>
          {
            links &&
            links?.map((link) => {
              return (
                <div className={styles.infoLink}>
                  <LinkSVG />
                  <a href={link?.url}>{link?.name}</a>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
