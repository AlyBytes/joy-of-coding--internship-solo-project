import CalendarWrap from "@/app/components/CalendarWrap";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Task } from "@prisma/client";
import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <Flex
      direction={{ initial: "column", md: "row" }}
      gap="5"
      justify="between"
    >
      <Box className="md:w-1/2 space-y-4">
        <Heading>{task.title}</Heading>

        <Flex gap="3">
          <TaskStatusBadge status={task.status} />
          <Text>{task.createdAt.toDateString()}</Text>
          {task.dueDate && <Text>Due Date: {formatDate(task.dueDate)}</Text>}
        </Flex>

        <Card className="prose max-w-full">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card>

        <Flex gap="3">
          <EditTaskButton taskId={task.id} />
          <DeleteTaskButton taskId={task.id} />
        </Flex>
      </Box>

      <Box className="md:w-1/2 mt-6 md:mt-0">
        <CalendarWrap />
      </Box>
    </Flex>
  );
};

export default TaskDetails;
