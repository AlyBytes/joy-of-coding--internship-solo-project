import React from "react";
import TaskForm from "../../_components/TaskForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading } from "@radix-ui/themes";

interface Props{
    params: {id:string}
}

// interface Props {
//   params: Promise<{ id: string }>;
// }
const statusClassMap: Record<"OPEN" | "IN_PROGRESS" | "CLOSED", string> = {
  OPEN: "bg-orange-50",
  IN_PROGRESS: "bg-violet-50",
  CLOSED: "bg-green-50",
};

const EditTaskPage = async ({ params }: { params: { id: string }}) => {
  // const resolvedParams = await params;
  // const task = await prisma.task.findUnique({
  //   where: { id: parseInt(params.id)},
  // });
   // Since the params are asynchronous, you should await them first
   const id = parseInt(params.id);

   // Fetch the task based on the `id`
   const task = await prisma.task.findUnique({
     where: { id},
   });

  if (!task) notFound();

  return (
    <div
      className={`space-y-6 p-6 rounded-xl shadow-md ${
        statusClassMap[task.status]
      }`}
    >
      <Heading size="4" className="mb-4">
        Edit Task: {task.title}
      </Heading>
      <TaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;
