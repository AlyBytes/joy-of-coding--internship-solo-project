import React from "react";
import TaskForm from "../../_components/TaskForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props{
    params: {id:string}
}

// interface Props {
//   params: Promise<{ id: string }>;
// }

const EditTaskPage = async ({ params }: Props) => {
  // const resolvedParams = await params;
  // const task = await prisma.task.findUnique({
  //   where: { id: parseInt(params.id)},
  // });
   // Since the params are asynchronous, you should await them first
   const { id } = params;

   // Fetch the task based on the `id`
   const task = await prisma.task.findUnique({
     where: { id: parseInt(id) },
   });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
