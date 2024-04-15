import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";


const useQuestionPopup = (callback) => {
    const description = () => {
        return (
            <span>
                Вы уверены что хотите передать управление рабочей областью участнику <span>Константин?</span>
            </span>
        );
    }
    
    const popupProps = {
        type: "question",
        title: "Передать управление",
        description: description
    }
    
    const popupManager = usePopupManager();
    const openQuestionPopup = () => {
        popupManager.open(Popup, {
        popup: {component: AlertPopup, props: popupProps},
        onClose: callback,
        }); 
    }
    openQuestionPopup();
}


export default useQuestionPopup; 