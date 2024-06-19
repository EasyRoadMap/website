import styles from "./styles.module.css";
import TaskRoadmapSVG from "../../../assets/TaskRoadmapSVG.jsx";
import MoveRoadMap from "../../../assets/moveRoadMap.jsx";
import { useState, useEffect, useRef } from "react";
import RoadmapPagination from "./RoadmapPagination.jsx";


const getStatusByProgress = (progress, is_in_progress) => {
    if (progress === 0 && is_in_progress) return "progress";
    if (progress === 0) return "planned";
    if (progress === 1) return "done";
    return "progress";
};

const RoadmapGraph = ({
    stages, chosenStage, setChosenStage
}) => {
    const [moveDelta, setMoveDelta] = useState(null);
    const [centeredBlock, setCenteredBlock] = useState(0);
    const [visibleStagesList, setVisibleStagesList] = useState(null);
    const [SIZES, setSizes] = useState({
      viewportWidth: null,
      viewportHeight: 453,
      stageCircleWidth: 131
    });
    const [circlesFitsIn, setCirclesFitsIn] = useState(null);
    const viewport = useRef(null);

    useEffect(() => {
      if (circlesFitsIn == null) return;
      moveToBlock(pickInitialCenteredStage(stages));
    }, [circlesFitsIn]);

    useEffect(() => {
      if (SIZES.viewportWidth == null) return;
      setCirclesFitsIn(countCirclesFitsIntoViewport(SIZES.viewportWidth));
    }, [SIZES]);

    useEffect(() => {
      if (!viewport.current) return;
      const vpw = viewport.current.offsetWidth;
      // const vph = viewport.current.offsetHeight;
      setSizes((prev) => ({
        ...prev,
        viewportWidth: vpw
      }))
    }, [viewport]);

    useEffect(() => {
      updateVisibleBlocksList();
    }, [stages, moveDelta]);

    const countCirclesFitsIntoViewport = (viewportWidth) => {
      return Math.floor((viewportWidth - 131) / 100);
  }

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
      if (blocks && blocks.length > 0) blocks = [...blocks];
      const viewport = document.querySelector(viewportClassName);
      const blocksVisible = [];
      blocks.forEach((container) => {
        blocksVisible.push(isBlockVisible(container, viewport));
      });
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
        const width = 100 * (stages.length - 1) + 4;
        const initRight = (-100) * (stages.length - 1) + SIZES.stageCircleWidth / 2 - 2;
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
            top: stages.length > 1 ? top : "unset",
            bottom: bottom,
            right: right,
            position: "absolute"
        };
    }

    const moveToBlock = (i) => {
        const circleOnCenter = countCirclesFitsIntoViewport(SIZES.viewportWidth / 2);
        if (stages.length >= circlesFitsIn + 1 && i < circleOnCenter) i = circleOnCenter;
        else if (i < 0) i = 0;
        if (stages.length >= circlesFitsIn + 1 && i > stages.length - circleOnCenter) i = stages.length - circleOnCenter;
        if (i > stages.length - 1) i = stages.length - circleOnCenter - 1;
        if (stages.length <= circlesFitsIn + 1 && stages.length > 1) i = Math.ceil(stages.length / 2) - 1;
        const initRight = i * (-100);
        const goalRight = SIZES.viewportWidth/2 - SIZES.stageCircleWidth/2;
        // console.debug("moved to ", [i, stages.length / 2, initRight, goalRight, SIZES.viewportWidth/2, circlesFitsIn]);
        setCenteredBlock(i);
        setMoveDelta(goalRight - initRight);
    }

    return (
        <>
      <div className={styles.graph} ref={viewport}>
        {stages.length > 0 && (
          <div
            className={styles.graphLine}
            style={getLinePlace()}
          ></div>
        )}
        <div className={styles.graphRoadmap}>
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
                    {stage.position % 2 === 0 && stages.length > 1 && (
                      <div className={styles.graphBranchLine}></div>
                    )}
                    <div
                      style={
                        stage.position % 2 === 0 && stages.length > 1
                          ? { marginTop: "10px", position: "relative" }
                          : { marginBottom: "10px", position: "relative" }
                      }
                    >
                      <div className={styles.graphCircle}>
                        <TaskRoadmapSVG
                          status={getStatusByProgress(
                            stage.progress,
                            stage.is_in_progress
                          )}
                          isActive={chosenStage === stage.id}
                          progress={stage.progress}
                          id={stage.id}
                        />
                        <span
                          className={
                            chosenStage === stage.id
                              ? [styles.stageName, styles.stageNameActive].join(
                                  " "
                                )
                              : styles.stageName
                          }
                        >
                          {stage?.name}
                        </span>
                      </div>
                    </div>
                    {stage.position % 2 === 1 && (
                      <div className={styles.graphBranchLine}></div>
                    )}
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
          {stages.length > circlesFitsIn + 1 && (
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
      {stages.length > circlesFitsIn + 1 && <RoadmapPagination blocks={visibleStagesList} />}
    </>
  );
};

export default RoadmapGraph;
