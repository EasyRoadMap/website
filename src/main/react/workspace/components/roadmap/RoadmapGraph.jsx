import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import styles from "./styles.module.css";
import TaskRoadmapSVG from "../../../assets/TaskRoadmapSVG.jsx";
import AddTaskRoadmapSVG from "../../../assets/addTaskRoadmapSVG.jsx";
import MoveRoadMap from "../../../assets/moveRoadMap.jsx";
import DeleteTaskRoadmap from "../../../assets/deleteTaskRoadmapSVG.jsx";
import { usePopupManager } from "react-popup-manager";
import AlertPopup from "../popup/AlertPopup.jsx";
import { askForDeleteStageProps } from "../popup/PopupsData.jsx";
import Popup from "../popup/Popup.jsx";
import CreateStagePopup from "../popup/CreateStage.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import { useState, useEffect } from "react";
import RoadmapPagination from "./RoadmapPagination.jsx";


const SIZES = {
    viewportWidth: 648,
    viewportHeight: 453,
    stageCircleWidth: 131
}

const getStatusByProgress = (progress, is_in_progress) => {
    if (progress === 0 && is_in_progress) return "progress";
    if (progress === 0) return "planned";
    if (progress === 1) return "done";
    return "progress";
};

const RoadmapGraph = ({
    stages,
    projectId
}) => {
    const { chosenStage, setChosenStage } = useRoadmapContext();
    const { CreateStage, DeleteStage } = useRoadmapInfo();
    const [moveDelta, setMoveDelta] = useState(SIZES.viewportWidth/2 - SIZES.stageCircleWidth/2);
    const [centeredBlock, setCenteredBlock] = useState(0);
    const [visibleStagesList, setVisibleStagesList] = useState(null);

    useEffect(() => {
        moveToBlock(pickInitialCenteredStage(stages));
    }, []);

    useEffect(() => {
      updateVisibleBlocksList();
    }, [stages, moveDelta]);

    const openStage = (stage_id) => {
        setChosenStage(stage_id);
    };

    const pixelsToInt = (pixelValue) => {
      return parseInt(pixelValue.slice(0, pixelValue.length - 2));
    };

    const isBlockVisible = (block, viewport) => {
      const blockPos = block.offsetWidth + pixelsToInt(block.style.right);
      return blockPos < viewport.offsetWidth && pixelsToInt(block.style.right) > 0;
    };

    const getBloksVisibility = () => {
      const blocksClassName = "." + styles.graphStage;
      const viewportClassName = "." + styles.graphRoadmap;
      let blocks = document.querySelectorAll(blocksClassName);
      if (blocks && blocks.length > 0) blocks = [...blocks].slice(1);
      const viewport = document.querySelector(viewportClassName);
      const blocksVisible = [];
      blocks.forEach((container) => {
        blocksVisible.push(isBlockVisible(container, viewport));
      });
      console.debug("getBloksVisibility", blocksVisible);
      return blocksVisible;
    };

    const updateVisibleBlocksList = () => {
      const blocksVisible = getBloksVisibility();
      setVisibleStagesList(blocksVisible);
    }

    const pickInitialCenteredStage = (stages) => {
        let chosenStage = null;
        stages.forEach((stage, i) => {
            if (stage.progress > 0 && stage.progress < 1) {
            chosenStage = i;
            return i;
            } else if (stage.progress === 0 && chosenStage === null)
            chosenStage = i;
        });

        if (chosenStage) return chosenStage;
        return stages.length - 1;
    };

    const getLinePlace = () => {
        const top = "calc(50% - 2px)";
        const width = 100 * stages.length + 4;
        const initRight = (-100) * stages.length + SIZES.stageCircleWidth / 2 - 2;
        const right = initRight + moveDelta + "px";
        return { 
            top: top, 
            width: width,
            right: right
        }
    }

    const getPlace = (i) => {
        const top = i % 2 === 1 ? null : "calc(50% + 2px)";
        const bottom = i % 2 === 0 ? null : "calc(50% + 2px)";
        const right = i * (-100) + moveDelta + "px";
        return {
            top: top,
            bottom: bottom,
            right: right,
            position: "absolute"
        };
    }

    const moveToBlock = (i) => {
        if (i < 0) i = 0;
        if (i > stages.length) i = stages.length;
        const initRight = i * (-100);
        const goalRight = SIZES.viewportWidth/2 - SIZES.stageCircleWidth/2;
        setCenteredBlock(i);
        setMoveDelta(goalRight - initRight);
    }


    const popupManager = usePopupManager();
    const openCreateStagePopup = () => {
        popupManager.open(Popup, {
        popup: { component: CreateStagePopup },
        onClose: (...params) => {
            if (params?.[0].button === "create" && params?.[0].name && projectId) {
            CreateStage(projectId, params?.[0].name, (stage) => {
                moveToBlock(stage.position);
            });
            }
        },
        });
    };

    const onCloseDeleteStagePopup = (...params) => {
        const chosenStagePosition = params[1];
        if (params?.[0] === "yes" && (chosenStagePosition || chosenStagePosition === 0) && projectId) {
        const stageToDelete = stages.find((stage) => {
            if (stage.position === chosenStagePosition) return stage;
        });
        if (!stageToDelete) return;

        DeleteStage(projectId, stageToDelete.id, () => {
            const newStages = stages.filter((stage) => {
                return stage.id !== stageToDelete.id;
            })
            const initialStage = pickInitialCenteredStage(newStages);
            moveToBlock(initialStage);
            setChosenStage(null);
        });
        
        }
    };

    const openDeleteStagePopup = (stageName, chosenStagePosition) => {
        popupManager.open(Popup, {
        popup: {
            component: AlertPopup,
            props: askForDeleteStageProps(stageName),
        },
        onClose: (params) => onCloseDeleteStagePopup(params, chosenStagePosition),
        });
    };

    return (
        <>
      <div className={styles.graph}>
        {stages.length > 0 && (
          <div
            className={styles.graphLine}
            style={getLinePlace()}
          ></div>
        )}
        <div className={styles.graphRoadmap}>
          <div
            className={styles.graphStage}
            style={stages.length > 0 ? getPlace(stages.length) : {...getPlace(stages.length), top: "unset"}}
          >
            {stages.length > 0 && stages.length % 2 === 0 && (
              <div className={styles.graphBranchLine}></div>
            )}
            <div
              onClick={openCreateStagePopup}
              style={stages.length > 0 ? { marginBottom: "35px", marginTop: "15px" } : null}
            >
              <AddTaskRoadmapSVG />
            </div>
            {stages.length > 0 && stages.length % 2 === 1 && (
              <div className={styles.graphBranchLine}></div>
            )}
          </div>
          {stages &&
            stages?.length > 0 &&
            stages.map((stage, i) => {
              return (
                <div
                  className={styles.graphStage}
                  onClick={() => openStage(stage.id)}
                  style={getPlace(stage.position)}
                >
                    <>
                        {
                            i % 2 === 0 &&
                            <div className={styles.graphBranchLine}></div>
                        }
                        <div style={i % 2 === 0 ? 
                            {marginTop: "10px", position: "relative"} : 
                            {marginBottom: "10px", position: "relative"}}
                        >
                        <div className={styles.graphCircle}>
                          <DeleteTaskRoadmap
                            className={styles.deleteTask}
                            onClick={() => {
                                openDeleteStagePopup(stage?.name, i);
                            }}
                          />
                          <TaskRoadmapSVG
                            status={getStatusByProgress(stage.progress, stage.is_in_progress)}
                            isActive={chosenStage === stage.id}
                            progress={stage.progress}
                            id={stage.id}
                          />
                          <input
                            type="text"
                            placeholder={stage.name}
                            className={styles.stageName}
                          />
                        </div>
                      </div>
                        {
                            i % 2 === 1 &&
                            <div className={styles.graphBranchLine}></div>
                        }
                    </>
                </div>
              );
            })}
          <div
            className={[
              styles.moveGraphButton,
              styles.moveGraphButtonRight,
            ].join(" ")}
          ></div>
          <div
            className={[
              styles.moveGraphButton,
              styles.moveGraphButtonLeft,
            ].join(" ")}
          ></div>
          {stages.length > 0 && (
            <div className={styles.moveButtons}>
              <MoveRoadMap
                style={{
                  transform: "rotate(180deg)",
                  pointerEvents: "all",
                }}
                onClick={() => moveToBlock(centeredBlock - 3)}
              />
              <MoveRoadMap
                style={{
                  pointerEvents: "all",
                }}
                onClick={() => moveToBlock(centeredBlock + 3)}
              />
            </div>
          )}
        </div>
      </div>
      {stages.length > 0 && (
        <RoadmapPagination blocks={visibleStagesList} />
      )}
    </>
    );
}

export default RoadmapGraph;