import { taskSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(
    request:NextRequest, 
    {params}:{params:{id:string}}){
    const body = await request.json();
    const validation = taskSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

    const task = await prisma.task.findUnique({
        where: {id:parseInt(params.id)}
    });
    if(!task) 
        return NextResponse.json({error: "Invalid Task"}, {status: 404})

    // Prepare the data for update, including dueDate if provided
  const updatedData: any = {
    title: body.title,
    description: body.description,
    status: body.status,
  };

  // Only update dueDate if it is provided
  if (body.dueDate) {
    updatedData.dueDate = new Date(body.dueDate); // Ensure dueDate is stored as a Date object
  }
   // Update the task in the database
   const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: updatedData,
  });

    // const updatedTask = await prisma.task.update({
    //     where:{id:task.id},
    //     data:{
    //         title: body.title,
    //         description: body.description,
    //         status: body.status
    //     }
    // });

    return NextResponse.json(updatedTask)


}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({}, { status: 401 });
  
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