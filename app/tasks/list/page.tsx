// import React from "react";
// import { Button, Flex, Table } from "@radix-ui/themes";
// // import Link from "next/link";
// // import { Link } from "@radix-ui/themes"; //when using this component instead of Link from next navigation we lose client side rendering and page reloads every time
// import Link from "../../components/Link";
// import NextLink from "next/link";
// import { prisma } from "@/prisma/client";
// import TaskStatusBadge from "../../components/TaskStatusBadge";
// // import delay from "delay";
// import TasksActionButton from "./TasksActionButton";
// import { Status, Task } from "@prisma/client";
// import { ArrowUpIcon } from "@radix-ui/react-icons";
// import Pagination from "@/app/components/Pagination";
// import TaskTable, { columnNames, TaskQuery } from "./TaskTable";

// // interface Props {
// //   searchParams: { status: Status; orderBy: keyof Task; page: string };
// // }
// // const TasksPage = async ({ searchParams }: Props) => {
// //   const statuses = Object.values(Status);
// //   // console.log(statuses)
// //   // console.log(searchParams.status)
// //   const status = statuses.includes(searchParams.status)
// //     ? searchParams.status
// //     : undefined;
// //   const where = { status };

// //   const orderBy = columnNames.includes(searchParams.orderBy)
// //     ? { [searchParams.orderBy]: "asc" }
// //     : undefined;

// //   const page = parseInt(searchParams.page) || 1;
// //   const pageSize = 10;

// //   const tasks = await prisma.task.findMany({
// //     where,
// //     orderBy,
// //     // {[searchParams.orderBy]:'asc'},
// //     skip: (page - 1) * pageSize,
// //     take: pageSize,
// //   });
// //   // await delay(2000);

// //   const taskCount = await prisma.task.count({ where });

// // interface Props {
// //   searchParams: Record<string, string | string[] | undefined>; // ✅ FIXED
// // }

// // const TasksPage = async ({ searchParams }: Props) => {
// //   // ✅ Normalize raw searchParams
// //   const statusRaw = searchParams.status;
// //   const orderByRaw = searchParams.orderBy;
// //   const pageRaw = searchParams.page;

// //   const status =
// //     typeof statusRaw === "string" &&
// //     Object.values(Status).includes(statusRaw as Status)
// //       ? (statusRaw as Status)
// //       : "OPEN";

// //   const orderBy =
// //     typeof orderByRaw === "string" &&
// //     columnNames.includes(orderByRaw as keyof Task)
// //       ? (orderByRaw as keyof Task)
// //       : "createdAt";

// //   const page =
// //     typeof pageRaw === "string" && !isNaN(parseInt(pageRaw))
// //       ? parseInt(pageRaw)
// //       : 1;

// //   const pageSize = 10;

// //   const where = { status };
// //   const tasks = await prisma.task.findMany({
// //     where,
// //     orderBy: { [orderBy]: "asc" },
// //     skip: (page - 1) * pageSize,
// //     take: pageSize,
// //   });

// //   const taskCount = await prisma.task.count({ where });

// //   // ✅ Now pass a clean, safe object
// //   const parsedQuery: TaskQuery = {
// //     status,
// //     orderBy,
// //     page: page.toString(),
// //   };

// export default async function TasksPage({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | string[] };
// }) {
//   const statusRaw = searchParams?.status;
//   const orderByRaw = searchParams?.orderBy;
//   const pageRaw = searchParams?.page;

//   const status =
//     typeof statusRaw === "string" && Object.values(Status).includes(statusRaw as Status)
//       ? (statusRaw as Status)
//       : "OPEN";

//   const orderBy =
//     typeof orderByRaw === "string" && columnNames.includes(orderByRaw as keyof Task)
//       ? (orderByRaw as keyof Task)
//       : "createdAt";

//   const page =
//     typeof pageRaw === "string" && !isNaN(parseInt(pageRaw))
//       ? parseInt(pageRaw)
//       : 1;

//   const pageSize = 10;

//   const where = { status };

//   const tasks = await prisma.task.findMany({
//     where,
//     orderBy: { [orderBy]: "asc" },
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//   });

//   const taskCount = await prisma.task.count({ where });

//   const parsedQuery: TaskQuery = {
//     status,
//     orderBy,
//     page: page.toString(),
//   };

//   return (
//     // <div>TasksPage</div>
//     <Flex direction="column" gap="3">
//       {/* <div className="mb-5">
//         <Button>
//           <Link href="/tasks/new">New Task</Link>
//         </Button>
//       </div> */}
//       <TasksActionButton />
//       <TaskTable searchParams={parsedQuery} tasks={tasks} />
//       <Pagination
//         pageSize={pageSize}
//         currentPage={page}
//         itemCount={taskCount}
//       />
//     </Flex>
//   );
// };

// export const dynamic = "force-dynamic";

// export default TasksPage;

import { prisma } from "@/prisma/client";
import { Status, Task } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "@/app/components/Pagination";
import TaskTable, { TaskQuery, columnNames } from "./TaskTable";
import TasksActionButton from "./TasksActionButton";

export const dynamic = "force-dynamic";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const statusRaw = searchParams.status;
  // const orderByRaw = searchParams.orderBy;
  // const pageRaw = searchParams.page;

  const resolvedSearchParams = await searchParams;

  // const statusRaw = resolvedSearchParams.status;
  const directionRaw = resolvedSearchParams?.orderDirection;
  const orderDirection =
    directionRaw === "desc" || directionRaw === "asc" ? directionRaw : "asc";
  const orderByRaw = resolvedSearchParams.orderBy;
  const pageRaw = resolvedSearchParams.page;
  // console.log("Search Params:", resolvedSearchParams);

  const rawStatus = resolvedSearchParams?.status;
  // console.log("Raw Status from Search Params:", rawStatus);
  // const rawStatus = searchParams.status;

  // const status: Status | "ALL" =
  //   rawStatus === "ALL"
  //     ? "ALL"
  //     : rawStatus &&
  //       typeof rawStatus === "string" &&
  //       ["OPEN", "IN_PROGRESS", "CLOSED"].includes(rawStatus)
  //     ? (rawStatus as Status)
  //     : "ALL"; // fallback to ALL if invalid

  //instead of above

  const isValidStatus = (val: any): val is Status =>
    ["OPEN", "IN_PROGRESS", "CLOSED"].includes(val);

  const status: Status | "ALL" =
    rawStatus === "ALL" || !rawStatus
      ? "ALL"
      : isValidStatus(rawStatus)
      ? (rawStatus as Status)
      : "ALL"; // Fallback to 'ALL' if invalid status

  // Ensure the status is a valid Status or "ALL"
  // const status: Status | "ALL" = ["OPEN", "IN_PROGRESS", "CLOSED"].includes(rawStatus)
  //   ? (rawStatus as Status)
  //   : "ALL";

  const orderBy =
    typeof orderByRaw === "string" &&
    columnNames.includes(orderByRaw as keyof Task)
      ? (orderByRaw as keyof Task)
      : "createdAt";

  const page =
    typeof pageRaw === "string" && !isNaN(Number(pageRaw))
      ? parseInt(pageRaw)
      : 1;
  const pageSize = 10;
  // console.log("Status value:", status);

  const where = status === "ALL" ? {} : { status };

  const tasks = await prisma.task.findMany({
    where,
    ...(orderBy !== "status" && {
      orderBy: { [orderBy]: orderDirection },
    }),
    // orderBy:
    // orderBy === "status"
    //   ? undefined // handled separately below
    //   : { [orderBy]: orderDirection },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  // console.log("Fetched tasks:", tasks);
  let sortedTasks = tasks;

  if (orderBy === "status") {
    const order = {
      OPEN: 0,
      IN_PROGRESS: 1,
      CLOSED: 2,
    };

    const multiplier = orderDirection === "asc" ? 1 : -1;

    sortedTasks = tasks.sort((a, b) => {
      return (order[a.status] - order[b.status]) * multiplier;
    });
  }

  const taskCount = await prisma.task.count({ where });

  const parsedQuery: TaskQuery = {
    status,
    orderBy,
    orderDirection,
    page: page.toString(),
  };

  // console.log("Raw status from query:", rawStatus);
  // console.log("Final parsed status:", status);
  // console.log("Where filter:", where);

  // console.log("Fetched tasks:", tasks);

  console.log("Prisma query parameters:", { where, orderBy, page });

  return (
    <Flex direction="column" gap="3">
      <TasksActionButton />
      <TaskTable searchParams={parsedQuery} tasks={sortedTasks} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={taskCount}
      />
    </Flex>
  );
}
