import styles from "./styles.module.css";
import TaskRoadmapSVG from "../../../assets/TaskRoadmapSVG.jsx";
import AddTaskRoadmapSVG from "../../../assets/addTaskRoadmapSVG.jsx";
import MoveRoadMap from "../../../assets/moveRoadMap.jsx";
import DeleteTaskRoadmap from "../../../assets/deleteTaskRoadmapSVG.jsx";

import useProjectContext from "../../hooks/useProjectContext.js";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateStagePopup from "../popup/CreateStage.jsx";
import { useRef, useState, useEffect, useCallback } from "react";
import RoadmapPagination from "./RoadmapPagination.jsx";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";

const pixelsToInt = (pixelValue) => {
  return parseInt(pixelValue.slice(0, pixelValue.length - 2));
};

const isBlockVisible = (block, viewport) => {
  const blockPos = block.offsetWidth + pixelsToInt(block.style.right);
  return blockPos < viewport.offsetWidth && pixelsToInt(block.style.right) > 0;
};

const getBloksVisibility = (blocks, viewport) => {
  const blocksVisible = [];
  blocks.forEach((container) => {
    blocksVisible.push(isBlockVisible(container, viewport));
  });
  return blocksVisible.slice(0, blocksVisible.length - 1);
};

const getStatusByProgress = (progress) => {
  if (progress === 0) return "planned";
  if (progress === 1) return "done";
  return "progress";
};

const RoadmapGraph = ({ stages }) => {
  const [moveDiff, setMoveDiff] = useState(0);

  const [stageContainer, setStageContainer] = useState([]);
  const stageWrapper = useRef(null);
  const [blocksVisibility, setBlocksVisibility] = useState([]);

  const { projectId } = useProjectContext();
  const { CreateStage } = useRoadmapInfo();

  const { chosenStage, setChosenStage } = useRoadmapContext();

  const popupManager = usePopupManager();
  const openCreateStagePopup = () => {
    popupManager.open(Popup, {
      popup: { component: CreateStagePopup },
      onClose: (...params) => {
        if (params?.[0].button === "create" && params?.[0].name && projectId) {
          CreateStage(projectId, params?.[0].name, () => {
            setMoveDiff((prev) => prev + 100);
          });
        }
      },
    });
  };

  useEffect(() => {
    setBlocksVisibility(
      getBloksVisibility(stageContainer, stageWrapper.current).reverse()
    );
  }, [moveDiff]);

  useEffect(() => {
    setBlocksVisibility(
      getBloksVisibility(stageContainer, stageWrapper.current).reverse()
    );
  }, [stageContainer, stageWrapper]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setStageContainer((prev) => [node, ...prev]);
    }
  }, []);

  const openStage = (stage_id) => {
    setChosenStage(stage_id);
  };

  const moveGraph = (direction) => {
    if (stageContainer?.length < 1 || !stageWrapper.current) return;

    const sign = direction === "right" ? 1 : -1;

    if (
      pixelsToInt(stageContainer[stageContainer.length - 1].style.right) >=
        stageWrapper.current.offsetWidth -
          stageContainer[stageContainer.length - 1].offsetWidth &&
      direction === "right"
    ) {
      return;
    }

    if (
      pixelsToInt(stageContainer[stageContainer.length - 2].style.right) <=
        stageWrapper.current.offsetWidth -
          stageContainer[stageContainer.length - 2].offsetWidth &&
      direction === "left"
    ) {
      return;
    }
    setMoveDiff((prev) => prev + sign * 500);
    setBlocksVisibility(
      getBloksVisibility(stageContainer, stageWrapper.current).reverse()
    );
  };

  const pickInitialCenteredStage = () => {
    let chosenStage = null;

    stages.forEach((stage) => {
      if (stage.progress > 0 && stage.progress < 1) {
        chosenStage = stage;
        return stage;
      } else if (stage.progress === 0 && chosenStage === null)
        chosenStage = stage;
    });

    if (chosenStage) return chosenStage;
    return stages[stages.length - 1];
  };

  const getPositionDifferenceOfCenterBlock = (blockRef) => {
    const centerOfWrapper = stageWrapper.offsetWidth / 2;
    const widthOfBlock = blockRef.offsetWidth;
    const moveToX = centerOfWrapper + widthOfBlock / 2;
    const moveBlocksDifference = moveToX - blockRef.style.right;
  };

  const initStagesBlocksPosition = () => {
    if (!stageContainer.length > 1 || !stages) return;

    stageContainer.forEach((stageBlock, i) => {
      if (i === stageContainer.length - 1) return;
      const stage = stages[stageContainer.length - i - 2];
      const position = (stages.length - stage.position - 1) % 2;
      const marginRight = 40 + 100 * (stages.length - stage.position);
      const offsetY = getTopCenterPosition() + 2 + "px";
      const styleOfStage =
        position === 0 ? { top: offsetY } : { bottom: offsetY };
      styleOfStage.right = marginRight + "px";
      stageBlock.style.top = offsetY;
      stageBlock.style.right = marginRight + "px";
    });
  };

  const getInitialAddButtonPosition = () => {
    if (!stageWrapper.current || stageContainer.length === 0)
      return {
        left: 0,
        top: 0,
      };

    const addStageButtonBlock = stageContainer[0];
    const centerOfCanvas = {
      x: stageWrapper.current.offsetWidth / 2,
      y: stageWrapper.current.offsetHeight / 2,
    };
    const stageBlockSizes = {
      width: addStageButtonBlock.offsetWidth,
      height: addStageButtonBlock.offsetHeight,
    };
    return {
      left: centerOfCanvas.x - stageBlockSizes.width / 2,
      top: centerOfCanvas.y - stageBlockSizes.height / 2,
    };
  };

  const getTopCenterPosition = () => {
    if (!stageWrapper.current)
      return {
        top: 0,
      };
    return stageWrapper.current.offsetHeight / 2;
  };

  const getMostLeftStagePosition = () => {
    if (stageContainer.length < 2) return 0;

    const stageBlock = stageContainer[1];

    const mostLeftStageRightPosition = pixelsToInt(stageBlock.style.right);
    const mostLeftStageWidth = stageBlock.offsetWidth;

    return mostLeftStageRightPosition - mostLeftStageWidth / 2;
  };

  const getDiff = (stage) => {
    const centerOfWrapper = 648 / 2;
    const blockWidth = 131;
    const marginRight = 40 + 100 * (stages.length - stage.position);
    return centerOfWrapper - marginRight - blockWidth / 2;
  };

  let diff = 0;
  if (stages.length > 0) diff = getDiff(pickInitialCenteredStage());

  const getAddStageCircleStyles = () => {
    if (stageContainer.length > 1) {
      const offsetY = getTopCenterPosition() + 2 + "px";
      const style =
        stageContainer.length % 2 === 1
          ? { top: offsetY }
          : { bottom: offsetY };
      style.right = 40 + diff + moveDiff + "px";
      return style;
    } else {
      return {
        top: getInitialAddButtonPosition().top,
        left: getInitialAddButtonPosition().left,
      };
    }
  };

  return (
    <>
      <div className={styles.graph}>
        {stageContainer.length > 1 && (
          <div
            className={styles.graphLine}
            style={{
              top: "calc(50% - 2px)",
              right:
                40 +
                diff +
                moveDiff +
                stageContainer[0].offsetWidth / 2 -
                2 +
                "px",
              width: (stageContainer.length - 1) * 100 + 4 + "px",
            }}
          ></div>
        )}

        <div className={styles.graphRoadmap} ref={stageWrapper}>
          <div
            className={styles.graphStage}
            style={getAddStageCircleStyles()}
            ref={measuredRef}
          >
            {stageContainer.length > 1 && stageContainer.length % 2 === 1 && (
              <div className={styles.graphBranchLine}></div>
            )}
            <div
              onClick={openCreateStagePopup}
              style={{ marginBottom: "35px", marginTop: "15px" }}
            >
              <AddTaskRoadmapSVG />
            </div>
            {stageContainer.length > 1 && stageContainer.length % 2 === 0 && (
              <div className={styles.graphBranchLine}></div>
            )}
          </div>
          {stages &&
            stages?.length > 0 &&
            stages.map((stage, i) => {
              let styleOfStage = null;
              let position = null;
              position = stage.position % 2;
              const marginRight = 40 + 100 * (stages.length - stage.position);
              const offsetY = getTopCenterPosition() + 2 + "px";
              styleOfStage =
                position === 0 ? { top: offsetY } : { bottom: offsetY };
              styleOfStage.right = marginRight + diff + moveDiff + "px";
              return (
                <div
                  className={styles.graphStage}
                  style={styleOfStage}
                  onClick={() => openStage(stage.id)}
                  key={i}
                  ref={measuredRef}
                >
                  {position === 0 && (
                    <>
                      <div className={styles.graphBranchLine}></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                        }}
                      >
                        <div className={styles.graphCircle}>
                          <DeleteTaskRoadmap className={styles.deleteTask} />
                          <TaskRoadmapSVG
                            status={getStatusByProgress(stage.progress)}
                            isActive={chosenStage === stage.id}
                          />
                          <input
                            type="text"
                            placeholder={stage.name}
                            className={styles.stageName}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {position === 1 && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "30px",
                        }}
                      >
                        <div className={styles.graphCircle}>
                          <DeleteTaskRoadmap className={styles.deleteTask} />
                          <TaskRoadmapSVG
                            status={getStatusByProgress(stage.progress)}
                            isActive={chosenStage === stage.id}
                          />
                          <input
                            type="text"
                            placeholder={stage.name}
                            className={styles.stageName}
                          />
                        </div>
                      </div>
                      <div
                        className={styles.graphBranchLine}
                        style={{ bottom: 0, position: "absolute" }}
                      ></div>
                    </>
                  )}
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
          {stageContainer.length > 1 && (
            <div className={styles.moveButtons}>
              <MoveRoadMap
                style={{
                  transform: "rotate(180deg)",
                  pointerEvents: "all",
                }}
                onClick={() => moveGraph("left")}
              />
              <MoveRoadMap
                style={{
                  pointerEvents: "all",
                }}
                onClick={() => moveGraph("right")}
              />
            </div>
          )}
        </div>
      </div>
      {stageContainer.length > 1 && (
        <RoadmapPagination blocks={blocksVisibility} />
      )}
    </>
  );
};

export default RoadmapGraph;
