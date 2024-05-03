import styles from "./styles.module.css";
import AddingChangesForm from "./last-changes-list/AddingChangesForm.jsx";

const AddFilesField = ({
    files,
    setFiles,
    chosenStage
}) => {
    return (
        <AddingChangesForm files={files} setFiles={setFiles} chosenStage={chosenStage}/>
    );
}

export default AddFilesField;