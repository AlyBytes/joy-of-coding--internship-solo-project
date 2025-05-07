import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TaskStatusBadge from "./components/TaskStatusBadge";
import styles from "./TaskSummary.module.css"; // CSS module for custom media query

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
    // <Flex gap="4">
    //   {containers.map((container) => (
    //     <Card key={container.label}>
    //       <Flex direction="column" gap="1">
    //         <Link
    //           className='text-sm font-medium'
    //           href={`/tasks/list?status=${container.status}`}
    //         >
    //           {container.label}
    //         </Link>
    //         <Text size="5" className='font-bold'>{container.value}</Text>
    //       </Flex>
    //     </Card>
    //   ))}
    // </Flex>
    // <Flex direction="column" gap="4">
    //   <Flex gap="4" wrap="wrap">
    //     {containers.map((container) => (
    //       <Card
    //         key={container.label}
    //         variant="surface"
    //         className={`min-w-[120px] sm:min-w-[180px]
    //         ${container.status === "IN_PROGRESS" ? "hidden sm:block" : "block"}
    //         sm:w-1/3`}
    //       >
    //         <Flex direction="column" gap="1">
    //           <Link
    //             className="text-sm font-medium text-blue-600 hover:underline"
    //             href={`/tasks/list?status=${container.status}`}
    //           >
    //             {container.label}
    //           </Link>

    //           {/* Show TaskStatusBadge with consistent color */}
    //           <TaskStatusBadge status={container.status} />

    //           {/* Display task count with gray color for zero tasks */}
    //           <Text
    //             size="5"
    //             weight="bold"
    //             color={container.value === 0 ? "gray" : undefined} // Show gray color for 0 tasks
    //           >
    //             {container.value}
    //           </Text>
    //         </Flex>
    //       </Card>
    //     ))}
    //   </Flex>
    // </Flex>
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
          <Text size="5" weight="bold" color={container.value === 0 ? "gray" : undefined}>
            {container.value}
          </Text>
        </Flex>
      </Card>
    ))}
  </Flex>
  );
};

export default TaskSummary;
