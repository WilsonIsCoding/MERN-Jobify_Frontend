'use client'
import { SearchContainer, JobsContainer } from "@/app/components";
import AllJobsContextProvider from "@/app/context/AllJobsContext";

export default function Page() {
  return (
    <AllJobsContextProvider>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContextProvider>
  );
}
