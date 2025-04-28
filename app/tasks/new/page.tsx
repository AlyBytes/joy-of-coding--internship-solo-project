// import React from 'react'
import dynamic from 'next/dynamic'
import TaskFormSkeleton from './loading';
import TaskForm from '../_components/TaskForm'

// const TaskForm = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
//   ssr: false,
//   // loading: ()=> <TaskFormSkeleton />
// });

const NewTaskPage = () => {
  return (
    <TaskForm />
  )
}

export default NewTaskPage