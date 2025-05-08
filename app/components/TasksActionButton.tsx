import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TaskStatusFilter from "../tasks/list/TaskStatusFilter";

const TasksActionButton = () => {
  return (
    <Flex justify="between">
      {/* <TaskStatusFilter /> */}
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
    </Flex>
  );
};

export default TasksActionButton;
