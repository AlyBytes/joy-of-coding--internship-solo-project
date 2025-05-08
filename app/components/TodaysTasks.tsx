import { Status, Task } from "@prisma/client";
import { Text, Flex, Box } from "@radix-ui/themes";
import TaskStatusBadge from "./TaskStatusBadge";
import Link from "next/link";

interface Props {
  tasks: Task[];
}

const cardBackgroundMap: Record<Status, string> = {
  OPEN: "#FFF7ED",
  IN_PROGRESS: "#F3E8FF",
  CLOSED: "#ECFDF5",
};

export default function TodaysTasks({ tasks }: Props) {
  return (
    <div>
      <Box my="5">
        <Text weight="bold" size="5">
          {tasks.length ? "Tasks for Today" : "Let's do some good today!"}
        </Text>
      </Box>
      {tasks.length > 0 && (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="list-none">
              <Link
                href={`/tasks/${task.id}`}
                aria-label={`View details for task ${task.title}`}
              >
                <div
                  className="rounded-xl px-4 py-3 transition-colors hover:brightness-105"
                  style={{
                    backgroundColor: cardBackgroundMap[task.status],
                    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.08)",
                    borderRadius: "12px",
                  }}
                >
                  <Flex direction="column" gap="2">
                    <Text weight="medium" size="4">
                      {task.title}
                    </Text>
                    <div className="self-start">
                      <TaskStatusBadge status={task.status} />
                    </div>
                  </Flex>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
