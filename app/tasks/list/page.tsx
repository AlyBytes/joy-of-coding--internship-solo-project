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


  const resolvedSearchParams = await searchParams;

  const directionRaw = resolvedSearchParams?.orderDirection;
  const orderDirection =
    directionRaw === "desc" || directionRaw === "asc" ? directionRaw : "asc";
  const orderByRaw = resolvedSearchParams.orderBy;
  const pageRaw = resolvedSearchParams.page;
 

  const rawStatus = resolvedSearchParams?.status;


  const isValidStatus = (val: any): val is Status =>
    ["OPEN", "IN_PROGRESS", "CLOSED"].includes(val);

  const status: Status | "ALL" =
    rawStatus === "ALL" || !rawStatus
      ? "ALL"
      : isValidStatus(rawStatus)
      ? (rawStatus as Status)
      : "ALL"; // Fallback to 'ALL' if invalid status


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
