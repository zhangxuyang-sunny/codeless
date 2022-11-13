import { ProjectConfigData, ProjectStatus } from "@codeless/types";
import { useCallback, useEffect, useState } from "react";

import { apiGetProjectList } from "../core/api";

export const useProjectList = (resType: string) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(ProjectStatus.normal);
  const [createdUser, setCreatedUser] = useState("");
  const [updatedUser, setUpdatedUser] = useState("");
  const [createdTimeRange, setCreatedTimeRange] = useState([]);
  const [updatedTimeRange, setUpdatedTimeRange] = useState([]);
  const [projectList, setProjectList] = useState<ProjectConfigData[]>([]);

  const fetchProjectList = useCallback(async () => {
    const list = await apiGetProjectList({
      id,
      title,
      status,
      createdUser,
      updatedUser
    });
    setProjectList(list);
  }, [id, title, status, createdUser, updatedUser]);

  useEffect(() => {
    switch (resType) {
      case "application": {
        fetchProjectList();
        break;
      }
      case "component": {
        break;
      }
      case "data-source": {
        break;
      }
      case "dataset": {
        break;
      }
    }
  }, [fetchProjectList, resType]);

  return {
    id,
    setId,
    title,
    setTitle,
    status,
    setStatus,
    createdUser,
    setCreatedUser,
    updatedUser,
    setUpdatedUser,
    createdTimeRange,
    setCreatedTimeRange,
    updatedTimeRange,
    setUpdatedTimeRange,
    projectList,
    setProjectList,
    fetchProjectList
  };
};
