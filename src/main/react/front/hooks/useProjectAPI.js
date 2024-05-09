import { getProject } from "../api/getProject.js";

import useProjectContext from "./useProjectContext.js";

export const useProjectAPI = () => {
    const { setProjectContext } = useProjectContext();

    const GetProject = (pr_id) => {
        getProject(pr_id).then((response) => {
            setProjectContext(response.data);
        }).catch((e) => {
            console.error(e);
        })
    };

    return { GetProject };
}