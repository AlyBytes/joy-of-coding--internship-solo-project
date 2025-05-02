import { Status } from "@prisma/client";
import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Please describe your task').max(255),
    // status: z.nativeEnum(Status),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});
