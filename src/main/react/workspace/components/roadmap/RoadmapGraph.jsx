import styles from "./styles.module.css";
import TaskRoadmapSVG from "../../../assets/TaskRoadmapSVG.jsx";
import AddTaskRoadmapSVG from "../../../assets/addTaskRoadmapSVG.jsx";
import MoveRoadMap from "../../../assets/moveRoadMap.jsx";

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
  console.log("till the end");
  console.log(blocksVisible);
  return blocksVisible.slice(0, blocksVisible.length-1);
};

const getStatusByProgress = (progress) => {
  if (progress === 0) return "planned";
  if (progress === 1) return "done";
  return "progress";
} 

const RoadmapGraph = ({ stages }) => {
  // const stageContainer = useRef([]);
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
        if (params?.[0].button === 'create' && params?.[0].name && projectId) {
          CreateStage(projectId, params?.[0].name);
        }
      }
    });
  };

  useEffect(() => {
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP on use effect");
    setBlocksVisibility(
      getBloksVisibility(stageContainer, stageWrapper.current)
    );
  }, [stageContainer, stageWrapper]);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setStageContainer((prev) => ([node, ...prev]));
    }
  }, []);

  const openStage = (stage_id) => {
    setChosenStage(stage_id);
  }

  const moveGraph = (direction) => {
    console.log("WOW");
    console.log(stageContainer);
    if (stageContainer?.length < 1 || !stageWrapper.current) return;

    const sign = direction === "right" ? 1 : -1;

    if (
      pixelsToInt(stageContainer[stageContainer.length-1].style.right) >= 40 &&
      direction === "right"
    ) {
      stageContainer[stageContainer.length-1].style.right = "40px";
      return;
    }

    console.log("WELL");
    console.log(stageContainer);
    if (
      pixelsToInt(stageContainer[0].style.right) <=
        stageWrapper.current.offsetWidth -
          stageContainer[0].offsetWidth &&
      direction === "left"
    ) {
      return;
    }

    console.log("DAMN");
    stageContainer.forEach((container) => {
      console.log("FOREACH");
      const right = pixelsToInt(container.style.right);
      container.style.right = right + sign * 500 + "px";
    });
    setBlocksVisibility(
      getBloksVisibility(stageContainer, stageWrapper.current)
    );
  };

  return (
    <>
      <div className={styles.graph}>
        <div className={styles.graphLine}></div>

        <div className={styles.graphRoadmap} ref={stageWrapper}>
          <div
            className={styles.graphStage}
            style={{ top: "180px", right: "40px" }}
            // ref={(element) => (stageContainer.current[0] = element)}
            ref={measuredRef}
          >
            <div className={styles.graphBranchLine}></div>
            <div className={styles.graphCircle} onClick={openCreateStagePopup}>
              <AddTaskRoadmapSVG />
            </div>{" "}
            {/* with some specified color by stage.status */}
          </div>
          {(stages && stages?.length > 0) && stages.map((stage, i) => {
            // const position = (stages.length - i - 1) % 2;
            // const marginRight = 40 + 100 * (stages.length - i);
            const position = (stage.id - 1) % 2;
            const marginRight = 40 + 100 * (stage.id);
            return (
              <div
                className={styles.graphStage}
                style={{
                  top: 180 * position + "px",
                  right: marginRight + "px",
                }}
                onClick={() => openStage(stage.id)}
                key={i}
                // ref={(element) => (stageContainer.current[i + 1] = element)}
                ref={measuredRef}

              >
                {position === 1 && (
                  <div className={styles.graphBranchLine}></div>
                )}
                <div className={styles.graphCircle}>
                  <TaskRoadmapSVG status={getStatusByProgress(stage.progress)} isActive={chosenStage === stage.id} />
                </div>
                {/* with some specified color by stage.status */}
                <input
                  type="text"
                  placeholder={stage.name}
                  className={styles.stageName}
                />
                {/* can be chosen (stage.chosen) */}
                {position === 0 && (
                  <div
                    className={styles.graphBranchLine}
                    style={{ bottom: 0, position: "absolute" }}
                  ></div>
                )}
              </div>
            );
          })}
          <div
            className={[
              styles.moveGraphButton,
              styles.moveGraphButtonRight,
            ].join(" ")}
            onClick={() => moveGraph("right")}
          >
            <MoveRoadMap style={{ marginTop: "calc(177px - 32px)", right: "0", position: "absolute" }}/>
          </div>
          <div
            className={[
              styles.moveGraphButton,
              styles.moveGraphButtonLeft,
            ].join(" ")}
            onClick={() => moveGraph("left")}
          >
            <MoveRoadMap style={{ transform: "rotate(180deg)", marginTop: "calc(177px - 32px)", left: "0" }} />
          </div>
          <RoadmapPagination blocks={blocksVisibility} />
        </div>
      </div>
    </>
  );
};

export default RoadmapGraph;
