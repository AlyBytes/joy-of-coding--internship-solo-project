import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <Button asChild size="2" variant="surface">
      <Link href={`/tasks/edit/${taskId}`}>
        <Pencil2Icon className="mr-1" />
        Edit Task
      </Link>
    </Button>
  );
};

export default EditTaskButton;
