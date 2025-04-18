'use client'

import { Button, TextArea, TextField } from "@radix-ui/themes";
// import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface TaskForm{
    title: string,
    description: string
}

const NewTaskPage = () => {
    const router = useRouter();
    const{register, control, handleSubmit} = useForm<TaskForm>();
    // console.log(register('title'))
  return (
    <form 
        className='max-w-xl space-y-3' 
        onSubmit={handleSubmit(async (data)=>{await axios.post('/api/tasks', data);
            router.push('/tasks')
        })}>
        <TextField.Root size="1" placeholder="New Task" {...register('title')}> 
        {/* <TextArea placeholder="New Task" /> */}
        </TextField.Root>
      {/* <TextArea placeholder="Description" /> */}
        <Controller
            name='description'
            control={control}
            render ={({field})=><SimpleMDE placeholder="Description" {...field} />}
        />
      
      <Button> Submit New Task</Button>
    </form>
  );
};

export default NewTaskPage;
