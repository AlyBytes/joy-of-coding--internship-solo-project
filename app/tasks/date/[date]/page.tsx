// app/tasks/date/[date]/page.tsx

import { redirect } from "next/navigation";

import TaskDetails from "../../[id]/TaskDetails";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import DeleteTaskButton from "../../[id]/DeleteTaskButton";
import EditTaskButton from "../../[id]/EditTaskButton";

interface Props {
  params: {
    date: string;
  };
}

export default async function TasksByDatePage({ params }: Props) {
  const { date } = params;

  // Parse and validate date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return <p>Invalid date.</p>; // Optionally handle invalid format
  }

  // Get tasks where dueDate is on that exact day
  //   const startOfDay = new Date(`${date}T00:00:00`);
  // const endOfDay = new Date(`${date}T23:59:59.999`);

  const statusClassMap: Record<"OPEN" | "IN_PROGRESS" | "CLOSED", string> = {
    OPEN: "bg-orange-50",
    IN_PROGRESS: "bg-violet-50",
    CLOSED: "bg-green-50",
  };

  const [year, month, day] = date.split("-").map(Number);

  const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

  const tasks = await prisma.task.findMany({
    where: {
      dueDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (tasks.length === 0) {
    redirect(`/tasks/new?dueDate=${date}`);
  }

  return (
    <div className="space-y-6">
      <Heading size="4">
        Task{tasks.length > 1 ? "s" : ""} for {date}
      </Heading>
      {tasks.map((task) => (
        // <TaskDetails key={task.id} task={task} />
        <div
          key={task.id}
          className={`space-y-4 rounded-xl shadow-md p-4 ${
            statusClassMap[task.status]
          }`}
        >
          <TaskDetails task={task} />
          {/* <Flex gap="3">
            <EditTaskButton taskId={task.id} />
            <DeleteTaskButton taskId={task.id} />
          </Flex> */}
        </div>
      ))}
    </div>
  );
}
