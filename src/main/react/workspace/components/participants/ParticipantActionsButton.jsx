import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";
import { transferControlProps, removeParticipantProps } from "../popup/PopupsData.jsx";

const ParticipantActionsButton = () => {
    const [listShowed, setListShowed] = useState(false);

    const onCloseTransferControlPopup = (...params) => console.log('TransferControlPopup has closed with:', ...params);
    const onCloseRemoveParticipantPopup = (...params) => console.log('RemoveParticipantPopup has closed with:', ...params);


    const popupManager = usePopupManager();
    const openTransferControlPopup = () => {
        popupManager.open(Popup, {
        popup: {component: AlertPopup, props: transferControlProps("Константин")},
        onClose: onCloseTransferControlPopup,
        }); 
    }
    const openRemoveParticipantPopup = () => {
        popupManager.open(Popup, {
        popup: {component: AlertPopup, props: removeParticipantProps("Константин")},
        onClose: onCloseRemoveParticipantPopup,
        }); 
    }

    const buttons = [
        {icon: "", text: "Передать управление", callback: () => openTransferControlPopup()},
        {icon: "", text: "Изменить должность", callback: () => console.log("hehe")},
        {icon: "", text: "Исключить", callback: () => openRemoveParticipantPopup()},
    ]

    const toggleListvisibility = () => {
        setListShowed(prev => !prev);
    }

    return (
        <OutsideAlerter
            callback={() => setListShowed(false)}
            style={{ width: "fit-content" }}
        >
            <div className={styles.dotsWrapper}>
                <div className={styles.dots} onClick={toggleListvisibility}>
                    точки
                </div>
                <DropdownActionsList buttons={buttons} 
                                     showed={listShowed} 
                                     close={() => setListShowed(false)} 
                                     style={{  display: listShowed ? "block" : "none" }}/>
            </div>
        </OutsideAlerter>
    );
}

export default ParticipantActionsButton;