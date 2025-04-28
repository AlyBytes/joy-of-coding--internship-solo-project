"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
// import React from "react";
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Task } from "@prisma/client";

//this is lazy loading (component) because everything is loaded on the server initially but this is a client side component that uses navigator - a browser API
//so we need to disable static import and load it dynamically
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TaskFormData = z.infer<typeof taskSchema>;
//we're implementing client side validation with help of zod and axios
// interface TaskForm {  ---> we are letting Zod infer this type based on this schema
//   title: string;    ----> z.infer func returns a type, so we store it in type object
//   description: string;
// }

// interface Props{
//   task?: Task;
// }

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  // console.log(register('title'))
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (task) await axios.patch("/api/tasks/" + task.id, data);
      else await axios.post("/api/tasks", data);
      router.push("/tasks");
      router.refresh;
    } catch (error) {
      setSubmitting(false);
      // console.log(error)
      setError("Unexpected Error");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          size="1"
          defaultValue={task?.title}
          placeholder="New Task"
          {...register("title")}
        >
          {/* <TextArea placeholder="New Task" /> */}
        </TextField.Root>
        {/* <TextArea placeholder="Description" /> */}

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {task ? "Update Task" : "Submit New Task"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
