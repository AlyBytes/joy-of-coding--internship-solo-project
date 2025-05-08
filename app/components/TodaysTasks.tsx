// import { Status, Task } from "@prisma/client";
// import { Card, Flex, Text } from "@radix-ui/themes";
// import TaskStatusBadge from "./TaskStatusBadge";
// import Link from "next/link";

// interface Props {
//   tasks: Task[];
// }

// const getDominantStatus = (tasks: Task[]): Status | null => {
//   if (tasks.some((task) => task.status === "OPEN")) return "OPEN";
//   if (tasks.some((task) => task.status === "IN_PROGRESS")) return "IN_PROGRESS";
//   if (tasks.some((task) => task.status === "CLOSED")) return "CLOSED";
//   return null;
// };

// const cardBackgroundMap: Record<Status, string> = {
//   OPEN: "#FFF7ED", // soft orange background
//   IN_PROGRESS: "#F3E8FF", // soft violet background
//   CLOSED: "#ECFDF5", // soft green background
// };

// export default function TodaysTasks({ tasks }: Props) {
//   const dominantStatus = getDominantStatus(tasks);
//   const backgroundColor = dominantStatus
//     ? cardBackgroundMap[dominantStatus]
//     : "#F5F5F5";
//   return (
//     <Card
//       style={{
//         backgroundColor,
//         borderRadius: "12px",
//         padding: "16px",
//         boxShadow: "2px 2px 6px rgba(0,0,0,0.08)",
//       }}
//     >
//       <Text weight="bold" size="5">
//         {tasks.length ? "Tasks for Today" : "Let's do some good today!"}
//       </Text>
//       {tasks.length > 0 && (
//         <ul className="mt-3 pl-5">
//           {tasks.map((task) => (
//             <li key={task.id} className="mb-4 list-none">
//               <Link
//                 className="text-sm font-medium block rounded-md px-3 py-2 hover:bg-teal-50 transition-colors"
//                 href={`/tasks/${task.id}`}
//                 aria-label={`View details for task ${task.title}`}
//               >
//                 <Flex direction="column" gap="1">
//                   <Text weight="medium" size="4">{task.title}</Text>
//                   <div style={{ alignSelf: "flex-start" }}>
//                     <TaskStatusBadge status={task.status} />
//                   </div>
//                 </Flex>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Card>
//   );
// }

import { Status, Task } from "@prisma/client";
import { Text, Flex, Box } from "@radix-ui/themes";
import TaskStatusBadge from "./TaskStatusBadge";
import Link from "next/link";

interface Props {
  tasks: Task[];
}

const cardBackgroundMap: Record<Status, string> = {
  OPEN: "#FFF7ED", // soft orange
  IN_PROGRESS: "#F3E8FF", // soft violet
  CLOSED: "#ECFDF5", // soft green
};

export default function TodaysTasks({ tasks }: Props) {
  return (
    <div>
      <Box my="5">
        <Text weight="bold" size="5">
          {tasks.length ? "Tasks for Today" : "Let's do some good today!"}
        </Text>
      </Box>
      {tasks.length > 0 && (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="list-none">
              <Link
                href={`/tasks/${task.id}`}
                aria-label={`View details for task ${task.title}`}
              >
                <div
                  className="rounded-xl px-4 py-3 transition-colors hover:brightness-105"
                  style={{
                    backgroundColor: cardBackgroundMap[task.status],
                    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.08)",
                    borderRadius: "12px",
                  }}
                >
                  <Flex direction="column" gap="2">
                    <Text weight="medium" size="4">
                      {task.title}
                    </Text>
                    <div className="self-start">
                      <TaskStatusBadge status={task.status} />
                    </div>
                  </Flex>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
