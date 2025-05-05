import Image from "next/image";
// import Pagination from "./components/Pagination";

// export default async function Home({
//   searchParams,
// }: {
//   searchParams?: { page?: string };
// }) {
//   const page = parseInt(searchParams?.page || "1");
//   return (
//     <>
//       <div> Hello World</div>
//       <Pagination itemCount={100} pageSize={10} currentPage={page} />
//     </>
//   );
// }

import Pagination from "./components/Pagination";
import LatestTasks from "./LatestTasks";
import TaskSummary from "./TaskSummary";
import { prisma } from "@/prisma/client";
import { Grid, Flex } from "@radix-ui/themes";

interface HomeProps {
  searchParams?: Record<string, string | string[]>;
}

// export default function Home({ searchParams }: HomeProps) {
// const pageParam = searchParams?.page;
// const currentPage = typeof pageParam === "string" ? parseInt(pageParam) : 1;
export default async function Home() {
  const open = await prisma.task.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.task.count({
    where: { status: "CLOSED" },
  });

  return (
    <>
      <div>Hello World</div>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <TaskSummary open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestTasks />
      </Grid>
      {/* <Pagination itemCount={100} pageSize={10} currentPage={currentPage} /> */}
    </>
  );
}
