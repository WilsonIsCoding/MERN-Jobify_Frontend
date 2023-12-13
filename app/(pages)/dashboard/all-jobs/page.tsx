"use client";
import customFetch from "@/app/utils/fetchUtils";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchContainer from "@/app/components/SearchContainer";
import JobsContainer from "@/app/components/JobsContainer";
const Loader = async () => {
  try {
    const response = await customFetch.get("/jobs");
    return response.data.jobs;
  } catch (error) {
    console.log(error);
  }
};

type AllJobsContextType = {
  jobs: Array<object>;
  deleteJob: (id: string) => Promise<void>;
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
  const deleteJob = async (id: string) => {
    try {
      await customFetch.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully");
      setJobs((jobs) => jobs.filter((job) => job._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return;
  };

  return (
    <AllJobsContext.Provider value={{ jobs, deleteJob }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
