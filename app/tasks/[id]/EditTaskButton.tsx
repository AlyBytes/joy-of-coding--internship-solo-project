import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    // <Button>
    //   <Pencil2Icon />
    //   <Link href={`/tasks/edit/${taskId}`}>Edit Task</Link>
    // </Button>

    <Button asChild size="2" variant="surface">
      <Link href={`/tasks/edit/${taskId}`}>
        <Pencil2Icon className="mr-1" />
        Edit Task
      </Link>
    </Button>
    // <Link href={`/tasks/edit/${taskId}`} passHref legacyBehavior>
    //   <a>
    //     <Button variant="surface" size="2">
    //       <Pencil2Icon />
    //       Edit Task
    //     </Button>
    //   </a>
    // </Link>
  );
};

export default EditTaskButton;
