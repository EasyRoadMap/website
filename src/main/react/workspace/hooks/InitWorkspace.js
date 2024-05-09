export const initWorkspace = (Workspace, Members, Projects, newWS) => {
    if (!newWS) {
        console.debug("there is no new ws id");
        return;
    }
    Workspace(newWS);
    Projects(newWS);
    Members(newWS);
}