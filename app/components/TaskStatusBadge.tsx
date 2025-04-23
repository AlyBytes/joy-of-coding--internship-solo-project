import { Status, Task } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
//this component should receive the status of task as a prop
//when using Prisma we don;t have to explicitly define types for our models - Prisma does(generates) it for us
interface Props {
  status: Status;
}

//we define const and set its type to REcord - is one of utility types in TS allows us to define key-value pairs of particular type
//Status - is key, and values is an obkect with two properties ->  labels and colors for the status badge
//with this annotation we can set this const to an object with following properties
//we defin this mapping outside of componnet because we don;t need it to render every time
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "open", color: "red" },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "closed", color: "green" },
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    // <div>TaskStatusBadge</div>
  );
};

export default TaskStatusBadge;
