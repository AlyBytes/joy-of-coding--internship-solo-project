import { prisma } from "@/prisma/client";
import { Card, Heading, Table, Flex, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import TaskStatusBadge from "./components/TaskStatusBadge";

const LatestTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card
      style={{
        position: "sticky",
        top: "20px",
        maxHeight: "calc(5 * 80px)",
        overflowY: "auto",
      }}
    >
      <Heading size="4" mb="4">
        Latest Tasks
      </Heading>

      {tasks.length === 0 ? (
        <Flex direction="column" gap="3">
          <Text size="2" color="gray">
            You have no tasks yet. Start by creating your first to-do!
          </Text>
          <Button asChild>
            <Link href="/tasks/new">Create New Task</Link>
          </Button>
        </Flex>
      ) : (
        <Table.Root>
          <Table.Body>
            {tasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>
                  {/* <Flex direction="column" align="start" gap="1">
                   */}
                  <Flex justify="between" align="center" width="100%">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-black hover:text-gray-600 transition-colors"
                    >
                      {task.title}
                    </Link>
                    <TaskStatusBadge status={task.status} />
                  </Flex>
                  {task.dueDate && (
                    <Text size="2" color="gray">
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Card>
  );
};

export default LatestTasks;
