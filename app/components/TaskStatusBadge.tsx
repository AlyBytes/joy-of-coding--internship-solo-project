import { Status, Task } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "orange" | "violet" | "green" }
> = {
  OPEN: { label: "open", color: "orange" },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "done", color: "green" },
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    // <div>TaskStatusBadge</div>
  );
};

export default TaskStatusBadge;
