"use client";

import { Suspense } from "react";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const TaskStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "ALL";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    params.set("page", "1"); // Reset to page 1 on filter change

    router.push(`/tasks/list?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Select.Root value={currentStatus} onValueChange={handleChange}>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map(({ label, value }) => (
            <Select.Item key={value} value={value}>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Suspense>
  );
};

export default TaskStatusFilter;
