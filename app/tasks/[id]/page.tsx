import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: Promise<{ id: string }>; //  Promise here!
}

const statusClassMap: Record<"OPEN" | "IN_PROGRESS" | "CLOSED", string> = {
  OPEN: "bg-orange-50",
  IN_PROGRESS: "bg-violet-50",
  CLOSED: "bg-green-50",
};


const TaskDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });
  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className={`md:col-span-4 space-y-6 p-6 rounded-xl shadow-md ${
        statusClassMap[task.status]
      }`}>
        <TaskDetails task={task} />
      {/* </Box>
      <Box> */}
        {/* <Flex direction="column" gap="4">
          <EditTaskButton taskId={task.id} />
          <DeleteTaskButton taskId={task.id} />
        </Flex> */}
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
