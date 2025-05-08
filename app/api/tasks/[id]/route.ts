import { taskSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
  params: {id:string}
}

export async function PATCH(
    request:NextRequest, 
    { params }: { params: { id: string } }
  ): Promise<NextResponse> 
    {
    const body = await request.json();
    const validation = taskSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})
   
    const id = parseInt(params.id);
    const task = await prisma.task.findUnique({
        // where: {id:parseInt(id)}
        where: {id},
    });
    if(!task) 
        return NextResponse.json({error: "Invalid Task"}, {status: 404})

  
  const updatedData: any = {
    title: body.title,
    description: body.description,
    status: body.status,
  };


  if (body.dueDate) {
   
    const [year, month, day] = body.dueDate.split('-').map(Number);
  updatedData.dueDate = new Date(year, month - 1, day);
  }

   const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: updatedData,
  });
    return NextResponse.json(updatedTask)
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {

    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) }
    });
  
    if (!task)
      return NextResponse.json(
        { error: "Invalid task" },
        { status: 404 }
      );
  
    await prisma.task.delete({
      where: { id: task.id },
    });
  
    return NextResponse.json({});
  }