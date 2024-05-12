export const initWorkspace = (Workspace, Members, Projects, newWS) => {
    if (!newWS) {
        return;
    }
    Workspace(newWS, true);
    Projects(newWS);
    Members(newWS);
}