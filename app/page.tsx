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

interface HomeProps {
  searchParams?: Record<string, string | string[]>;
}

export default function Home({ searchParams }: HomeProps) {
  const pageParam = searchParams?.page;
  const currentPage = typeof pageParam === "string" ? parseInt(pageParam) : 1;

  return (
    <>
      <div>Hello World</div>
      <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />
    </>
  );
}