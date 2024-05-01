export const initProject = (Project, Members, getStages, newProject) => {
    Project(newProject);
    Members(newProject);
    getStages(newProject);
}