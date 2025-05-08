import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TaskStatusBadge from "./components/TaskStatusBadge";
import styles from "./TaskSummary.module.css";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const TaskSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    className?: string;
  }[] = [
    { label: "Open Tasks", value: open, status: "OPEN" },
    {
      label: "In-progress Tasks",
      value: inProgress,
      status: "IN_PROGRESS",
      className: styles.inProgressOnlyOnDesktop,
    },
    { label: "Closed Tasks", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4" wrap="wrap">
      {containers.map((container) => (
        <Card
          key={container.label}
          className={container.className}
          style={{ minWidth: "140px", flex: "1 1 0" }}
        >
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/tasks/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <TaskStatusBadge status={container.status} />
            <Text
              size="5"
              weight="bold"
              color={container.value === 0 ? "gray" : undefined}
            >
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default TaskSummary;
