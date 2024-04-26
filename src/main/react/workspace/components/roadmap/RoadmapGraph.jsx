import styles from "./styles.module.css";
import TaskRoadmapSVG from "../../../assets/TaskRoadmapSVG.jsx";
import AddTaskRoadmapSVG from "../../../assets/addTaskRoadmapSVG.jsx";
import MoveRoadMap from "../../../assets/moveRoadMap.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateTaskPopup from "../popup/CreateTaskPopup.jsx";
import { useRef, useState, useEffect } from "react";
import RoadmapPagination from "./RoadmapPagination.jsx";

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
  return blocksVisible.slice(1, blocksVisible.length);
};

const RoadmapGraph = ({ stages }) => {
  const stageContainer = useRef([]);
  const stageWrapper = useRef(null);
  const [blocksVisibility, setBlocksVisibility] = useState([]);

  const popupManager = usePopupManager();
  const openCreateTaskPopup = () => {
    popupManager.open(Popup, {
      popup: { component: CreateTaskPopup },
      onClose: (...params) =>
        console.log("RemoveParticipantPopup has closed with:", ...params),
    });
  };

  useEffect(() => {
    setBlocksVisibility(
      getBloksVisibility(stageContainer.current, stageWrapper.current)
    );
    console.log("asdasd");
  }, [stageContainer, stageWrapper]);

  const moveGraph = (direction) => {
    if (stageContainer.current?.length < 1 || !stageWrapper.current) return;

    const sign = direction === "right" ? 1 : -1;

    if (
      pixelsToInt(stageContainer.current[0].style.right) >= 40 &&
      direction === "right"
    ) {
      stageContainer.current[0].style.right = "40px";
      return;
    }
    if (
      pixelsToInt(stageContainer.current[1].style.right) <=
        stageWrapper.current.offsetWidth -
          stageContainer.current[1].offsetWidth &&
      direction === "left"
    ) {
      return;
    }
    stageContainer.current.forEach((container) => {
      const right = pixelsToInt(container.style.right);
      container.style.right = right + sign * 500 + "px";
    });
    setBlocksVisibility(
      getBloksVisibility(stageContainer.current, stageWrapper.current)
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
            ref={(element) => (stageContainer.current[0] = element)}
          >
            <div className={styles.graphBranchLine}></div>
            <div className={styles.graphCircle} onClick={openCreateTaskPopup}>
              <AddTaskRoadmapSVG />
            </div>{" "}
            {/* with some specified color by stage.status */}
          </div>
          {stages.map((stage, i) => {
            const position = (stages.length - i - 1) % 2;
            const marginRight = 40 + 100 * (stages.length - i);
            return (
              <div
                className={styles.graphStage}
                style={{
                  top: 180 * position + "px",
                  right: marginRight + "px",
                }}
                key={i}
                ref={(element) => (stageContainer.current[i + 1] = element)}
              >
                {position === 1 && (
                  <div className={styles.graphBranchLine}></div>
                )}
                className={styles.graphCircle}
                <div className={styles.graphCircle}>
                  <TaskRoadmapSVG />
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
            <MoveRoadMap />
          </div>
          <div
            className={[
              styles.moveGraphButton,
              styles.moveGraphButtonLeft,
            ].join(" ")}
            onClick={() => moveGraph("left")}
          >
            <MoveRoadMap style={{ transform: "rotate(180deg)" }} />
          </div>
          <RoadmapPagination blocks={blocksVisibility} />
        </div>
      </div>
    </>
  );
};

export default RoadmapGraph;
