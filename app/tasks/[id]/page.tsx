// import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
// import ReactMarkdown from "react-markdown";
// import delay from 'delay'
// import { Pencil2Icon } from "@radix-ui/react-icons";
// import Link from "next/link";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

//to grab id parameter from the route we need to dfine interface with params property. the type of this is an object with one property - id of type string
//all values in a route are string values by default - we need to parse them as numbers
interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  //validating type of the id parameter before using it to fetch a task from db
  //Mosh is not using this - because he said it doesnt add value. I am not using this because it produces following:
  //Error: Route "/tasks/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
  //and i cannot drill and read description of existing tasks
  // if (typeof params.id !== "number") notFound();

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();
  // await delay(5000)

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        {/* <Heading>{task.title}</Heading>
        <Flex gap="3">
          <TaskStatusBadge status={task.status} />
          <Text>{task.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card> */}
        <TaskDetails task={task} />
      </Box>
      <Box>
        {/* <Button>
          <Pencil2Icon />
          <Link href={`/tasks/${task.id}/edit`}>Edit Task</Link>
        </Button> */}
        <EditTaskButton taskId={task.id} />
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
