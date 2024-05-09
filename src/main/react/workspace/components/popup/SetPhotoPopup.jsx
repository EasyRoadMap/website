import styles from "./styles.module.css";
// import Cropper from "../cropper/Cropper.jsx";
import Button from "../UI/Button.jsx";
import { useState } from "react";


const cropBySizes = (
  sourceURL,
  destX,
  destY,
  destWidth,
  destHeight
) => {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  const imageObj = new Image();

  console.debug(context);

  imageObj.onload = function() {
    // const sourceX = 150;
    // const sourceY = 0;
    // const sourceWidth = 150;
    // const sourceHeight = 150;
    // const destWidth = sourceWidth;
    // const destHeight = sourceHeight;
    // const destX = canvas.width / 2 - destWidth / 2;
    // const destY = canvas.height / 2 - destHeight / 2;
    console.debug("sizes", 0, 0, this.width, this.height, destX, destY, destWidth, destHeight);
    console.debug("image", this);


    context.drawImage(this, 0, 0, this.width, this.height, destX, destY, destWidth, destHeight);
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // console.debug("cropped image", image);
  };
  imageObj.src = sourceURL;
}

const SetPhotoPopup = ({ close, photo }) => {
  const [croppedAreaSizes, setCroppedAreaSizes] = useState(null);

  const handleClick = (nameButtonClicked) => {
    cropBySizes(photo.URL, croppedAreaSizes.x, croppedAreaSizes.y, croppedAreaSizes.width, croppedAreaSizes.height)
    // if (
    //   nameButtonClicked !== "change"
    // )
    //   return;
    // close(nameButtonClicked);
  };

  return (
    <>
        <h1 className={styles.title}>Изменить изображение</h1>
        <div className={styles.description}>
            Выбранная область будет показываться в качестве изображения вашего проекта.
        </div>
        <div className={styles.cropperContainer}>
          <div className={styles.cropperWrapper}>
            {/* <Cropper 
              setCroppedAreaSizes={setCroppedAreaSizes}
              photo={photo}
            /> */}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
            <Button
            text="Применить"
            type="filledAccent"
            callback={() => handleClick("change")}
            style={{ width: "146px", height: "40px" }}
            />
        </div>
        <canvas
          id='myCanvas'
          style={{
            // display: "none",
            // userSelect: "none",
            // pointerEvents: "none",
            // position: "absolute",
            // zIndex: 10000000,
          }}
        >

        </canvas>
    </>
  );
};

export default SetPhotoPopup;
