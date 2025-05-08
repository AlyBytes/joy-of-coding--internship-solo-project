import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useRouter } from "next/navigation";
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

  function formatLocalDate(date: Date): string {
    return date.toLocaleDateString("en-CA");
  }

  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;

    const formattedDay = formatLocalDate(day);

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
    <Flex
      direction="column"
      align="center"
      gap="4"
      className="w-full max-w-full"
    >
      <Flex direction="column" gap="4" className="w-full mx-auto">
        <div className="p-4 bg-white rounded-md shadow-md w-full">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={handleDayClick}
            required={false}
            modifiers={{
              hasTask: tasksWithDueDates.map((t) => t.dueDate),
            }}
            modifiersClassNames={{
              hasTask: "bg-blue-100 text-blue-800 font-semibold",
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
