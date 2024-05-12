import styles from "./style.module.css";
import TextLink from "../UI/TextLInk.jsx";
import CopyLinkSVG from "../../../assets/copyLinkSVG.jsx";
import ShareLinkSVG from "../../../assets/shareLinkSVG.jsx";

const LinkVisitorPage = ({ link }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Публичная страница</span>
      <div className={styles.linkWrapper}>
        <span className={styles.description}>
          Ваш проект доступен всем пользователям с этой ссылкой.
          <br />
          Поделитесь ею со своей аудиторией, чтобы показать свой прогресс.
        </span>

        <div className={styles.link}>
          <span className={styles.linkTitle}>Ссылка для посетителей</span>
          <div className={styles.linkField}>
            <TextLink
              placeholder="https://easyroadmap.ru/p/00000000-0000-0000-0000-000000000000"
              style={{ width: "540px" }}
              data={link}
            />
            <div className={styles.LinkSVG}>
              <CopyLinkSVG />
            </div>
            <div className={styles.LinkSVG}>
              <ShareLinkSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkVisitorPage;
