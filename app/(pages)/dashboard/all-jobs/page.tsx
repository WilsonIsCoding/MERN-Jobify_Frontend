"use client";
import customFetch from "@/app/utils/fetchUtils";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-toastify";
import SearchContainer from "@/app/components/SearchContainer";
import JobsContainer from "@/app/components/JobsContainer";
const Loader = async () => {
  try {
    const response = await customFetch.get("/jobs");
    return response.data.jobs;
  } catch (error) {
    // toast.error("You are not authorized to view this page");
    console.log(error);
  }
};

type AllJobsContextType = {
  jobs: Array<object>;
};

const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
export default function Page() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await Loader();
      setJobs(jobsData);
      console.log(jobsData[0].company);
    };
    fetchData();
  }, []);
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
