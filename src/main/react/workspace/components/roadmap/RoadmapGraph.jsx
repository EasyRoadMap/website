import styles from "./styles.module.css";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateTaskPopup from "../popup/CreateTaskPopup.jsx";

const RoadmapGraph = ({
    stages
}) => {
    
    const popupManager = usePopupManager();
    const openCreateTaskPopup = () => {
        popupManager.open(Popup, {
        popup: {component: CreateTaskPopup},
        onClose: (...params) => console.log('RemoveParticipantPopup has closed with:', ...params)
    }); 
    }

    return (
        <div className={styles.graph}>
            <div className={styles.graphLine}>

            </div>
            <div className={styles.graphStage} style={{top: "180px", right: "40px"}} >
                <div className={styles.graphBranchLine}></div>
                <div className={styles.graphCircle} onClick={openCreateTaskPopup}></div> {/* with some specified color by stage.status */}
            </div>
            <div className={styles.graphRoadmap}>
                {stages.map((stage, i) => {
                    const position = (stages.length - i - 1) % 2;
                    const marginRight = 40 + 100 * (stages.length - i);
                    return (
                        <div className={styles.graphStage} style={{top: (180 * position) + "px", right: marginRight + "px"}} key={i} >
                            {position === 1 && <div className={styles.graphBranchLine}></div>}
                            <div className={styles.graphCircle}></div> {/* with some specified color by stage.status */}
                            <input type="text" placeholder={stage.name}/> {/* can be chosen (stage.chosen) */}
                            {position === 0 && <div className={styles.graphBranchLine} style={{bottom: 0, position: "absolute"}}></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RoadmapGraph;