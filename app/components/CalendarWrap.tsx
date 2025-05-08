"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
const CalendarUtil = dynamic(() => import("./CalendarUtil"), {
  ssr: false,
});

export default function CalendarWrap() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    router.push(`/tasks/new?dueDate=${dateStr}`);
  };

  return (
    <div>
      <CalendarUtil onDateSelect={handleDateSelect} />
      {selectedDate && (
        <p className="text-sm text-gray-500 mt-2">
          You selected: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
}
