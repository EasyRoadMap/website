import { getProject } from "../api/project-api/getProject.js";
import { deleteProject } from "../api/project-api/deleteProject.js";
import { createProject } from "../api/project-api/createProject.js";
import { useState, useEffect } from "react";
import useProjectContext from "./useProjectContext.js";
import { useWorkspaceInfo } from "./useWorkspace.jsx";
import { getMembers } from "../api/project-api/getMembers.js";
import { updateInfo } from "../api/project-api/updateInfo.js";
import { updateLinks } from "../api/project-api/updateLinks.js";
import { getInfo } from "../api/project-api/getInfo.js";
import { getLinks } from "../api/project-api/getLinks.js";
import { removeMember } from "../api/project-api/removeMember.js";
import { addMember } from "../api/project-api/addMember.js";
import { updateMemberRole } from "../api/project-api/updateMemberRole.js";
import { getAttachableMembers } from "../api/project-api/getAttachableMembers.js";

import useErrorContext from "./useErrorContext.js";
import { getProjectError } from "../errors/project_errors.js";

export const useProjectInfo = () => {
  const [project, setProject] = useState({});
    const { pushError } = useErrorContext();
    const { projectContext, setProjectContext, setProjectId } =
    useProjectContext();

  const { Projects } = useWorkspaceInfo();

  useEffect(() => {
    if (project?.id) {
      setProjectId(project.id);
    }
    setProjectContext((prev) => ({ ...prev, ...project }));
  }, [project]);

  const handleError = (e) => {
    const error_message = getProjectError(e?.response?.data?.error_code);
    pushError(error_message, "error");
}

  const Project = (pr_id) => {
    getProject(pr_id)
      .then((response) => {
        setProject((prev) => ({ ...prev, ...response.data }));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const DeleteProject = (ws_id, pr_id, password, callback) => {
    deleteProject(pr_id, password)
      .then((response) => {
        Projects(ws_id);
        if (callback) callback();
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const CreateProject = (ws_id, name, description, deadlineAt, callback) => {
    createProject(ws_id, name, description, deadlineAt)
      .then((response) => {
        setProject((prev) => ({ ...prev, ...response.data }));
        Projects(ws_id);
        if (callback) callback(response.data);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const Members = (pr_id) => {
    getMembers(pr_id)
      .then((response) => {
        setProject((prev) => ({ ...prev, users: response.data }));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const KickMember = (pr_id, email) => {
    removeMember(pr_id, email)
      .then((response) => {
        Members(pr_id);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const AddMember = (pr_id, email) => {
    addMember(pr_id, email)
      .then((response) => {
        Members(pr_id);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const GetAttachableMember = (pr_id) => {
    getAttachableMembers(pr_id).then((response) => {
      Members(pr_id);
    })
    .catch((e) => {
      handleError(e);
    });
  }

  const Info = (pr_id) => {
    getInfo(pr_id)
      .then((response) => {
        setProject((prev) => ({ ...prev, info: response.data }));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const Links = (pr_id) => {
    getLinks(pr_id)
      .then((response) => {
        setProject((prev) => ({ ...prev, links: response.data }));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const UpdateInfo = (ws_id, pr_id, name, description, deadline_at) => {
    updateInfo(pr_id, name, description, deadline_at)
      .then((response) => {
        Info(pr_id);
        Projects(ws_id);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const UpdateLinks = (pr_id, names_array, urls_array) => {
    updateLinks(pr_id, names_array, urls_array)
      .then((response) => {
        Links(pr_id);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  const UpdateMemberRole = (pr_id, email, role) => {
    updateMemberRole(pr_id, email, role)
      .then((response) => {
        Members(pr_id);
      })
      .catch((e) => {
        handleError(e);
      });
  };

  return {
    Project,
    DeleteProject,
    GetAttachableMember,
    KickMember,
    AddMember,
    CreateProject,
    Members,
    UpdateInfo,
    UpdateLinks,
    UpdateMemberRole,
  };
};
