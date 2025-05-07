import { NextRequest, NextResponse } from "next/server";
import { describe } from "node:test";
import {prisma}from "@/prisma/client"
import { taskSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = taskSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const newTask = await prisma.task.create({
        data:{title:body.title, description:body.description, status: body.status, dueDate:body.dueDate ? new Date(body.dueDate) : null}
    });

    return NextResponse.json(newTask, {status:201})


}

export async function GET() {
    try {
      const tasks = await prisma.task.findMany({
        select: {
          id: true,
          title: true,
          dueDate: true,
        },
      });
  
      return NextResponse.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }