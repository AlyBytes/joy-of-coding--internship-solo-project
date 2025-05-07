import { prisma } from "@/prisma/client";
import { Card, Heading, Table, Flex, Button, Text as RadixText } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TaskStatusBadge from "./components/TaskStatusBadge";

const LatestTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Tasks
      </Heading>
      {/* <Table.Root>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                    <TaskStatusBadge status={task.status} />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card> */}
      {tasks.length === 0 ? (
        <Flex direction="column" gap="3">
          <RadixText size="2" color="gray">
            You have no tasks yet. Start by creating your first to-do!
          </RadixText>
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
                  <Flex justify="between" align="center">
                    <Flex direction="column" align="start" gap="1">
                      <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                      <TaskStatusBadge status={task.status} />
                    </Flex>
                  </Flex>
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
