export const initWorkspace = (Workspace, Members, Projects, newWS) => {
    Workspace(newWS);
    Projects(newWS);
    Members(newWS);
}