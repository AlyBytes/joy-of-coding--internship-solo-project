import CalendarWrap from "./components/CalendarWrap";
import LatestTasks from "./LatestTasks";
import TasksActionButton from "./tasks/list/TasksActionButton";
import TaskSummary from "./TaskSummary";
import { prisma } from "@/prisma/client";
import { Grid, Flex } from "@radix-ui/themes";

interface HomeProps {
  searchParams?: Record<string, string | string[]>;
}

export default async function Home() {
  // const open = await prisma.task.count({ where: { status: "OPEN" } });
  // const inProgress = await prisma.task.count({
  //   where: { status: "IN_PROGRESS" },
  // });
  // const closed = await prisma.task.count({
  //   where: { status: "CLOSED" },
  // });

  const [open, inProgress, closed] = await Promise.all([
    prisma.task.count({ where: { status: "OPEN" } }),
    prisma.task.count({ where: { status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <>
      <div>WELCOME TO YOUR </div>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <TasksActionButton />
          <TaskSummary open={open} inProgress={inProgress} closed={closed} />
          <CalendarWrap />
        </Flex>
        <LatestTasks />
      </Grid>
    </>
  );
}
