import dynamic from 'next/dynamic'
import TaskFormSkeleton from './loading';
import TaskForm from '../_components/TaskForm'


const NewTaskPage = () => {
  return (
    <TaskForm />
  )
}

export default NewTaskPage