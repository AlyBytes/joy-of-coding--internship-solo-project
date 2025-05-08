"use client";

import { Button, Callout, Card, Select, TextField } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Task } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm({ task }: { task?: Task }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dueDateParam = searchParams.get("dueDate");
  const defaultDueDate = dueDateParam ? new Date(dueDateParam) : undefined;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "OPEN",
      dueDate: task?.dueDate
        ? task.dueDate.toISOString().split("T")[0]
        : dueDateParam || "",
    },
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        ...data,
        dueDate: data.dueDate || undefined,
      };

      if (task) await axios.patch(`/api/tasks/${task.id}`, payload);
      else await axios.post("/api/tasks", payload);

      router.push("/");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Unexpected Error");
    }
  });

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Card size="3" className="p-6 space-y-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Title
            </label>
            <TextField.Root
              size="2"
              placeholder="Task title"
              {...register("title")}
              className="w-full"
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE {...field} placeholder="Write task details..." />
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="OPEN">Open</Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                    <Select.Item value="CLOSED">Done</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
            <ErrorMessage>{errors.status?.message}</ErrorMessage>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>
          </div>

          <div className="pt-4">
            <Button
              size="3"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {task ? "Update Task" : "Create Task"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
