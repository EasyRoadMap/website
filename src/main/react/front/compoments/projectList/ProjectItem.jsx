import styles from "./style.module.css";
import Button from "../UI/Button.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import CalendarPageVisitor from "../../../assets/calendarPageVisitor.jsx";
import { beautifyDate } from "../../utils/transformDateToMoreReadable.js";
import { useNavigate } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const ProjectItem = ({ name, description, photo, date, id }) => {
  const navigate = useNavigate();
  const { workspaceContext } = useWorkspaceContext();
  const avatarClassName = photo?.default
    ? [styles.projectItemAvatar, styles.pixelAvatar].join(" ")
    : styles.projectItemAvatarUser;

  return (
    <div className={styles.projectItem}>
      <div className={styles.projectItemInfo}>
        <img src={photo?.url} alt="" className={avatarClassName}></img>
        <div className={styles.infoWrapper}>
          <div className={styles.infoTitle}>
            <div className={styles.projectItemTitle}>{name}</div>
            {date && (
              <div className={styles.projectItemDateWrapper}>
                <CalendarPageVisitor />
                <div className={styles.projectItemDate}>
                  {beautifyDate(date)}
                </div>
              </div>
            )}
          </div>

          <div className={styles.projectItemDesc}>{description}</div>
        </div>
      </div>

      <Button
        text="Перейти"
        type="filledAccent"
        callback={() => {
          navigate(`/p/${workspaceContext.id}/${id}`);
        }}
        style={{ width: "608px", height: "40px" }}
      />
    </div>
  );
};

export default ProjectItem;
