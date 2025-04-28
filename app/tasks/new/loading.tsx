import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const LoadingTaskDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingTaskDetailPage;

// import TaskFormSkeleton from "../_components/TaskFormSkeleton";

// export default TaskFormSkeleton;
