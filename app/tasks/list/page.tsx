import React from "react";
import { Button, Table } from "@radix-ui/themes";
// import Link from "next/link";
// import { Link } from "@radix-ui/themes"; //when using this component instead of Link from next navigation we lose client side rendering and page reloads every time
import Link from "../../components/Link";
import NextLink from 'next/link'
import { prisma } from "@/prisma/client";
import TaskStatusBadge from "../../components/TaskStatusBadge";
// import delay from "delay";
import TasksActionButton from "./TasksActionButton";
import { Status, Task } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status, orderBy:keyof Task };
}
const TasksPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Task;
    className?: string;
  }[] = [
    { label: "Task", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const statuses = Object.values(Status);
  // console.log(statuses)
  // console.log(searchParams.status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // // const page = parseInt(searchParams.page) || 1;
  // const pageSize = 10;

  // const tasks = await prisma.task.findMany({
  //   where,
  //   orderBy:
  //   {[searchParams.orderBy]:'asc'},
    // skip: (page - 1) * pageSize,
    // take: pageSize,
  // });
  // await delay(2000);

  return (
    // <div>TasksPage</div>
    <div>
      {/* <div className="mb-5">
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </div> */}
      <TasksActionButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}>{column.label}</NextLink>{column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                  Task
              </Table.ColumnHeaderCell>
            ))}

            {/* <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>

                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TasksPage;
