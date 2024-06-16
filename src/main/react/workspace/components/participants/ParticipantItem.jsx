import styles from "./styles.module.css";
import ParticipantActionsButton from "./ParticipantActionsButton.jsx";
import ParticipantsActionsProjectButton from "./ParticipantsActionsProjectButton.jsx";
import WatchSVG from "../../../assets/watchSVG.jsx";
import CrownSVG from "../../../assets/crownSVG.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import useUserContext from "../../hooks/useUserContext.js";
import ParticipantInviteActionButton from "./ParticipantInviteActionButton.jsx";

const ParticipantItem = ({ participant, type }) => {
  const avatarClassName = participant?.user?.photo?.default
    ? [styles.avatar, styles.pixelAvatar].join(" ")
    : styles.avatarUser;

  const { workspaceContext } = useWorkspaceContext();
  const { userContext } = useUserContext();

  return (
    <div className={styles.participantWrapper}>
      <div className={styles.avatarWrapper}>
        <img
          src={participant?.user?.photo?.url}
          alt=""
          className={avatarClassName}
          style={
            participant?.is_invited
              ? {
                  filter: "blur(1.5px)",
                  opacity: "0.4",
                  backgroundColor: "var(--white-quarter-color)",
                }
              : {}
          }
        />
        {participant?.is_invited && <WatchSVG className={styles.watchSVG} />}
      </div>

      <div className={styles.infoWrapper}>
        <div
          className={!participant?.is_invited ? styles.info : styles.infoInvite}
        >
          <div className={styles.inviteText}>
            <span className={styles.name}>{participant?.user?.name}</span>
            {participant?.is_admin && (
              <CrownSVG style={{ marginLeft: "6px" }} />
            )}
          </div>
          <div className={styles.position}>
            {participant?.is_admin ? "" : participant?.role}
          </div>
        </div>
        {workspaceContext?.is_admin &&
          !participant?.is_invited &&
          !participant?.is_admin &&
          (type === "project" ? (
            participant?.user?.email !== userContext?.email && (
              <ParticipantsActionsProjectButton participant={participant} />
            )
          ) : (
            <ParticipantActionsButton participant={participant} />
          ))}
        {participant?.is_invited && (
          <ParticipantInviteActionButton participant={participant} />
        )}
      </div>
    </div>
  );
};

export default ParticipantItem;
