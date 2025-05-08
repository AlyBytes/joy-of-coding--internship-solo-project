import { prisma } from "@/prisma/client";
import CalendarWrap from "./components/CalendarWrap";
import TodaysTasks from "./components/TodaysTasks";
import LatestTasks from "./LatestTasks";
import TasksActionButton from "./components/TasksActionButton";
import TaskSummary from "./TaskSummary";
import { Grid, Flex, Text } from "@radix-ui/themes";

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
