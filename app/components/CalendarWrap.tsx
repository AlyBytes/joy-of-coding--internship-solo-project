// app/components/CalendarWrapper.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import CalendarUtil from "./CalendarUtil"; // or wherever your Calendar component lives

import dynamic from "next/dynamic"
const CalendarUtil = dynamic(() => import("./CalendarUtil"), {
    ssr: false,  // This ensures the component is only rendered client-side
  });

export default function CalendarWrap() {
    const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    router.push(`/tasks/new?dueDate=${dateStr}`);
  };
//   const handleDateSelect = (date: Date) => {
//     console.log("Selected date:", date);
//     setSelectedDate(date);
//     // Optionally: open a task form, etc.
//   };

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
