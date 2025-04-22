"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
// import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";

type TaskForm = z.infer<typeof createTaskSchema>;
//we're implementing client side validation with help of zod and axios
// interface TaskForm {  ---> we are letting Zod infer this type based on this schema
//   title: string;    ----> z.infer func returns a type, so we store it in type object
//   description: string;
// }

const NewTaskPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema),
  });
  // console.log(register('title'))
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/tasks", data);
            router.push("/tasks");
          } catch (error) {
            // console.log(error)
            setError("Unexpected Error");
          }
        })}
      >
        <TextField.Root size="1" placeholder="New Task" {...register("title")}>
          {/* <TextArea placeholder="New Task" /> */}
        </TextField.Root>
        {/* <TextArea placeholder="Description" /> */}

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button> Submit New Task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
