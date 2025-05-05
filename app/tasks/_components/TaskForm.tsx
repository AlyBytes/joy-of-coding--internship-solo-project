"use client";

import {
  Button,
  Callout,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";
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
import { Task, Status } from "@prisma/client";

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
    console.log("SUBMITTTING DATAAAAA:", data);
    try {
      setSubmitting(true);
      if (task) await axios.patch("/api/tasks/" + task.id, data);
      else await axios.post("/api/tasks", data);
      router.push("/tasks/list");
      router.refresh();
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

        <Controller
          name="status"
          control={control}
          defaultValue={task?.status || "OPEN"}
          render={({ field }) => (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Status
              </label>
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger />
                 
                <Select.Content>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          )}
        />
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {task ? "Update Task" : "Submit New Task"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;

// "use client";

// import {
//   Button,
//   Callout,
//   Select,
//   TextField,
// } from "@radix-ui/themes";
// import dynamic from "next/dynamic";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import "easymde/dist/easymde.min.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { taskSchema } from "@/app/validationSchemas";
// import { z } from "zod";
// import { ErrorMessage } from "@/app/components/ErrorMessage";
// import Spinner from "@/app/components/Spinner";
// import { Task, Status } from "@prisma/client";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

// type TaskFormData = z.infer<typeof taskSchema> & { status: Status };

// const TaskForm = ({ task }: { task?: Task }) => {
//   const router = useRouter();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TaskFormData>({
//     resolver: zodResolver(taskSchema),
//     defaultValues: {
//       title: task?.title || "",
//       description: task?.description || "",
//       status: task?.status || Status.OPEN,
//     },
//   });

//   const [error, setError] = useState("");
//   const [isSubmitting, setSubmitting] = useState(false);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setSubmitting(true);
//       if (task) await axios.patch("/api/tasks/" + task.id, data);
//       else await axios.post("/api/tasks", data);

//       router.push("/tasks/list");
//       router.refresh(); // <- you forgot to call this before
//     } catch (error) {
//       console.error(error);
//       setSubmitting(false);
//       setError("Unexpected error occurred.");
//     }
//   });

//   return (
//     <div className="max-w-xl">
//       {error && (
//         <Callout.Root color="red" className="mb-5">
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}
//       <form className="space-y-3" onSubmit={onSubmit}>
//         <TextField.Root
//           placeholder="Task Title"
//           {...register("title")}
//         />
//         <ErrorMessage>{errors.title?.message}</ErrorMessage>

//         <Controller
//           name="description"
//           control={control}
//           render={({ field }) => (
//             <SimpleMDE placeholder="Task Description" {...field} />
//           )}
//         />
//         <ErrorMessage>{errors.description?.message}</ErrorMessage>

//         <Controller
//           name="status"
//           control={control}
//           render={({ field }) => (
//             <Select.Root value={field.value} onValueChange={field.onChange}>
//               <Select.Trigger placeholder="Select status" />
//               <Select.Content>
//                 {Object.values(Status).map((status) => (
//                   <Select.Item key={status} value={status}>
//                     {status.replace("_", " ")}
//                   </Select.Item>
//                 ))}
//               </Select.Content>
//             </Select.Root>
//           )}
//         />
//         <ErrorMessage>{errors.status?.message}</ErrorMessage>

//         <Button disabled={isSubmitting}>
//           {task ? "Update Task" : "Submit New Task"}
//           {isSubmitting && <Spinner />}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;
