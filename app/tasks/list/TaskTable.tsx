import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Status, Task } from "@prisma/client";

export interface TaskQuery {
  status: Status | "ALL";
  orderBy: keyof Task;
  orderDirection: "asc" | "desc";
  page: string;
}

// export interface Props {
//   searchParams: {
//     status: Status;
//     orderBy: keyof Task;
//     page: string;
//   };
//   tasks: Task[];
// }

export interface Props {
  searchParams: TaskQuery; // ✅ This fixes the type mismatch
  tasks: Task[];
}

const TaskTable = ({ searchParams, tasks }: Props) => {
  const { status, page, orderBy, orderDirection } = searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
            const isActive = column.value === orderBy;
            const nextDirection =
              isActive && orderDirection === "asc" ? "desc" : "asc";

            return (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    pathname: "/tasks/list",
                    query: {
                      status,
                      page,
                      orderBy: column.value,
                      orderDirection: nextDirection,
                    },
                  }}
                  className="inline-flex items-center space-x-1"
                >
                  {column.label}
                  {isActive && (
                    <ArrowUpIcon
                      className={`transition-transform ${
                        orderDirection === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            );
          })}

          {/* <Table.ColumnHeaderCell className="hidden md:table-cell">
          Status
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Created
        </Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* {tasks.map((task) => (
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
        ))} */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
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
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={3} className="text-center text-gray-500">
              No tasks found.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Task;
  className?: string;
}[] = [
  { label: "Task", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

export default TaskTable;
