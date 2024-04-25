import styles from "./styles.module.css";

const RoadmapPagination = ({blocks}) => {
    return (
        <div className={styles.pagination}>
            {blocks?.length > 0 && blocks.map((isBlockVisible, i) => {
                const className = [styles.paginationCircle, 
                    isBlockVisible ? styles.paginationCircleActive : ""].join(" ");
                return (
                    <div key={i} className={className}></div>
                );
            })}
        </div>
    );
}

export default RoadmapPagination;