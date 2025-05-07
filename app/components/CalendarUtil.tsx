// // // components/Calendar.tsx
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/router";
// // import { DayPicker } from "react-day-picker";
// // import "react-day-picker/dist/style.css";
// // import { format } from "date-fns";

// // export default function CalendarUtil({
// //   onDateSelect,
// // }: {
// //   onDateSelect: (date: Date) => void;
// // }) {
// //   const [selectedDay, setSelectedDay] = useState<Date | undefined>();
// //   const [dueDates, setDueDates] = useState<Date[]>([]);

// //   const handleDayClick = (day: Date | undefined) => {
// //     setSelectedDay(day);
// //     if (day) {
// //       onDateSelect(day);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchDueDates = async () => {
// //       try {
// //         const res = await fetch("/api/tasks"); // Ensure this returns all tasks
// //         const data = await res.json();

// //         const extractedDates = data
// //           .filter((task: { dueDate?: string | null }) => !!task.dueDate)
// //           .map((task: { dueDate: string }) => new Date(task.dueDate));

// //         setDueDates(extractedDates);
// //       } catch (error) {
// //         console.error("Failed to fetch due dates", error);
// //       }
// //     };

// //     fetchDueDates();
// //   }, []);

// //   return (
// //     <div className="p-4 bg-white rounded-md shadow-md">
// //       <DayPicker
// //         mode="single"
// //         selected={selectedDay}
// //         onSelect={handleDayClick}
// //         required={false}
// //         modifiers={{ hasTask: dueDates }}
// //         modifiersClassNames={{
// //           hasTask: "bg-blue-100 text-blue-800 font-semibold",
// //         }}
// //       />
// //       {selectedDay && (
// //         <p className="mt-2 text-sm text-gray-600">
// //           Selected date: {format(selectedDay, "PPP")}
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useRouter } from "next/navigation"; // To navigate to task edit page
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { Flex } from "@radix-ui/themes";

export default function CalendarUtil({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [dueDates, setDueDates] = useState<Date[]>([]);
  const [tasksWithDueDates, setTasksWithDueDates] = useState<
    { id: string; dueDate: Date }[]
  >([]);
  const router = useRouter();

  // Fetch due dates of tasks
  //   useEffect(() => {
  //     const fetchDueDates = async () => {
  //       try {
  //         const res = await fetch("/api/tasks"); // Ensure this returns all tasks
  //         const data = await res.json();
  //         const extractedTasks = data
  //           .filter((task: { dueDate?: string | null }) => !!task.dueDate)
  //           .map((task: { id: string; dueDate: string }) => ({
  //             id: task.id,
  //             dueDate: new Date(task.dueDate),
  //           }));

  //         setTasksWithDueDates(extractedTasks);
  //       } catch (error) {
  //         console.error("Failed to fetch due dates", error);
  //       }
  //     };

  //     fetchDueDates();
  //   }, []);
  useEffect(() => {
    const fetchDueDates = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        console.log(data);

        const extractedTasks = data
          .filter((task: { dueDate?: string | null }) => !!task.dueDate)
          .map((task: { id: number; dueDate: string }) => ({
            id: task.id,
            dueDate: new Date(task.dueDate),
            localDueDate: formatLocalDate(new Date(task.dueDate)),
          }));

        setTasksWithDueDates(extractedTasks);
      } catch (error) {
        console.error("Failed to fetch due dates", error);
      }
    };

    fetchDueDates();
  }, []);

  // Handle click on a day
  //   const handleDayClick = (day: Date | undefined) => {
  //     if (day) {
  //       const formattedDay = day.toISOString().split("T")[0];
  //       const matchingTask = tasksWithDueDates.find(
  //         (task) => task.dueDate.toISOString().split("T")[0] === formattedDay
  //       );

  //       if (matchingTask) {
  //         router.push(`/tasks/edit/${matchingTask.id}`);
  //       } else {
  //         setSelectedDay(day);
  //         onDateSelect(day);
  //       }
  //     }
  //   };

  //   function formatLocalDate(date: Date): string {
  //     return date.toLocaleDateString("en-CA"); // Gives YYYY-MM-DD in local time
  //   }

  //   const handleDayClick = (day: Date | undefined) => {
  //     if (!day) return;

  //     const formattedDay = formatLocalDate(day);

  //     const matchingTasks = tasksWithDueDates.filter(
  //       (task) => formatLocalDate(task.dueDate) === formattedDay
  //     );

  //     router.push(`/tasks/date/${formattedDay}`);
  //   };
  function formatLocalDate(date: Date): string {
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
  }

  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;

    const formattedDay = formatLocalDate(day);

    // const matchingTasks = tasksWithDueDates.filter(
    //   (task) => formatLocalDate(task.dueDate) === formattedDay
    // );
    const matchingTasks = tasksWithDueDates.filter(
      (task) => formatLocalDate(new Date(task.dueDate)) === formattedDay
    );

    if (matchingTasks.length > 0) {
      router.push(`/tasks/date/${formattedDay}`);
    } else {
      router.push(`/tasks/new?dueDate=${formattedDay}`);
    }
  };

  return (
    // <div className="p-4 bg-white rounded-md shadow-md">
    <Flex
      direction="column"
      align="center"
      gap="4"
      className="w-full max-w-full"
    >
      {/* Calendar Container */}
      <Flex direction="column" gap="4" className="w-full mx-auto">
        <div className="p-4 bg-white rounded-md shadow-md w-full">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={handleDayClick}
            required={false}
            modifiers={{
              hasTask: tasksWithDueDates.map((t) => t.dueDate),
              //   hasTask: tasksWithDueDates.map((t) => {
              //     return new Date(formatLocalDate(t.dueDate));
              //   }),
            }}
            modifiersClassNames={{
              hasTask: "bg-blue-100 text-blue-800 font-semibold", // Customize task due dates
            }}
          />
          {selectedDay && (
            <p className="mt-2 text-sm text-gray-600">
              Selected date: {format(selectedDay, "PPP")}
            </p>
          )}
        </div>
      </Flex>
    </Flex>
  );
}

// //CLEANED UP VERSION import { useEffect, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import { useRouter } from "next/navigation";
// import { format } from "date-fns";
// import "react-day-picker/dist/style.css";
// import { useState, useEffect } from "react";

// export default function CalendarUtil({
//   onDateSelect,
// }: {
//   onDateSelect: (date: Date) => void;
// }) {
//   const [selectedDay, setSelectedDay] = useState<Date | undefined>();
//   const [tasksWithDueDates, setTasksWithDueDates] = useState<
//     { id: string; dueDate: Date }[]
//   >([]);

//   const router = useRouter();

//   // Helper to format date in local YYYY-MM-DD format
//   function formatLocalDate(date: Date): string {
//     return date.toLocaleDateString("en-CA"); // e.g., 2025-05-10
//   }

//   // Fetch and convert due dates to local Date objects
//   useEffect(() => {
//     const fetchDueDates = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();

//         const extractedTasks = data
//           .filter((task: { dueDate?: string | null }) => !!task.dueDate)
//           .map((task: { id: number; dueDate: string }) => ({
//             id: String(task.id),
//             dueDate: new Date(task.dueDate), // Convert to Date object immediately
//           }));

//         setTasksWithDueDates(extractedTasks);
//       } catch (error) {
//         console.error("Failed to fetch due dates", error);
//       }
//     };

//     fetchDueDates();
//   }, []);

//   const handleDayClick = (day: Date | undefined) => {
//     if (!day) return;

//     const formattedDay = formatLocalDate(day);

//     const matchingTasks = tasksWithDueDates.filter(
//       (task) => formatLocalDate(task.dueDate) === formattedDay
//     );

//     if (matchingTasks.length > 0) {
//       router.push(`/tasks/date/${formattedDay}`);
//     } else {
//       router.push(`/tasks/new?dueDate=${formattedDay}`);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-md shadow-md">
//      <DayPicker
//   mode="single"
//   selected={selectedDay}
//   onSelect={handleDayClick}
//   required={false} // ✅ Include this
//   modifiers={{
//     hasTask: tasksWithDueDates.map((t) => t.dueDate),
//   }}
//   modifiersClassNames={{
//     hasTask: "bg-blue-100 text-blue-800 font-semibold",
//   }}
// />
//       {selectedDay && (
//         <p className="mt-2 text-sm text-gray-600">
//           Selected date: {format(selectedDay, "PPP")}
//         </p>
//       )}
//     </div>
//   );
// }
