import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/tasks/${taskId}/edit`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskButton;
