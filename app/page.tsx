// import CalendarWrap from "./components/CalendarWrap";
// import TodaysTasks from "./components/TodaysTasks";
// import LatestTasks from "./LatestTasks";
// import TasksActionButton from "./tasks/list/TasksActionButton";
// import TaskSummary from "./TaskSummary";
// import { prisma } from "@/prisma/client";
// import { Grid, Flex, Text } from "@radix-ui/themes";

// const now = new Date(); // Local time

// const year = now.getFullYear();
// const month = now.getMonth(); // 0-based
// const day = now.getDate();

// const todayStart = new Date(year, month, day, 0, 0, 0, 0);
// const todayEnd = new Date(year, month, day, 23, 59, 59, 999);

// const todaysTasks = await prisma.task.findMany({
//   where: {
//     dueDate: {
//       gte: todayStart,
//       lte: todayEnd,
//     },
//   },
//   orderBy: {
//     createdAt: "desc",
//   },
// });

// interface HomeProps {
//   searchParams?: Record<string, string | string[]>;
// }

// export default async function Home() {
//   const [open, inProgress, closed] = await Promise.all([
//     prisma.task.count({ where: { status: "OPEN" } }),
//     prisma.task.count({ where: { status: "IN_PROGRESS" } }),
//     prisma.task.count({ where: { status: "CLOSED" } }),
//   ]);

//   return (
//     <>
//       {/* <div
//         style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight: "600" }}
//       > */}
//       <Flex direction="column" gap="5">
//       <Text weight="bold" size="5"> WELCOME TO YOUR DAY</Text>

//         <TasksActionButton />
//       </Flex>
//       {/* </div> */}

//       <Grid columns={{ initial: "1", md: "2" }} gap="5">
//         <Flex direction="column" gap="5">
//           <TodaysTasks tasks={todaysTasks} />
//           <TaskSummary open={open} inProgress={inProgress} closed={closed} />

//           <CalendarWrap />
//         </Flex>
//         <LatestTasks />
//       </Grid>
//     </>
//   );
// }

// app/page.tsx
import { prisma } from "@/prisma/client";
import CalendarWrap from "./components/CalendarWrap";
import TodaysTasks from "./components/TodaysTasks";
import LatestTasks from "./LatestTasks";
import TasksActionButton from "./components/TasksActionButton";
import TaskSummary from "./TaskSummary";
import { Grid, Flex, Text } from "@radix-ui/themes";

// Utility to get today's start and end (local time)
const getTodayRange = () => {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  return { start, end };
};

export default async function Home() {
  const { start: todayStart, end: todayEnd } = getTodayRange();

  const [todaysTasks, open, inProgress, closed] = await Promise.all([
    prisma.task.findMany({
      where: {
        dueDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.task.count({ where: { status: "OPEN" } }),
    prisma.task.count({ where: { status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <>
      <Flex direction="column" gap="5" mb="5">
        <Text weight="bold" size="5">
          WELCOME TO YOUR DAY
        </Text>
        <TasksActionButton />
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <TodaysTasks tasks={todaysTasks} />
          <TaskSummary open={open} inProgress={inProgress} closed={closed} />
          <CalendarWrap />
        </Flex>

        <LatestTasks />
      </Grid>
    </>
  );
}
