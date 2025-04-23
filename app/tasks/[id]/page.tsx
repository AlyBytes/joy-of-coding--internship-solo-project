import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

//to grab id parameter from the route we need to dfine interface with params property. the type of this is an object with one property - id of type string
//all values in a route are string values by default - we need to parse them as numbers
interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  //validating type of the id parameter before using it to fetch a task from db 
  if (typeof params.id !== 'number') notFound();
  
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();

  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.createdAt.toDateString()}</p>
    </div>
  );
};

export default TaskDetailPage;
