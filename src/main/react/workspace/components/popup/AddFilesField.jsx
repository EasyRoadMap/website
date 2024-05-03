import styles from "./styles.module.css";
import AddingChangesForm from "./last-changes-list/AddingChangesForm.jsx";

const AddFilesField = ({
    files,
    setFiles
}) => {
    return (
        <AddingChangesForm files={files} setFiles={setFiles}/>
    );
}

export default AddFilesField;