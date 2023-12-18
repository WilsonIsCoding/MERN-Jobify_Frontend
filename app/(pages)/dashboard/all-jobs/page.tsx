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

interface SearchParamsHandlerResult {
  data: object;
  searchValues: object;
}
type AllJobsContextType = {
  jobs: Array<object>;
  deleteJob: (id: string) => Promise<void>;
  searchParamsHandler: (params: object) => Promise<SearchParamsHandlerResult>;
};
const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
export default function Page() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await Loader();
        setJobs(jobsData);
      } catch (error) {
        console.log(error);
      }
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

  const searchParamsHandler = async (params: object) => {
    try {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      console.log(data);
      setJobs(data.jobs);
      return {
        data,
        searchValues: { ...params },
      };
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };
  return (
    <AllJobsContext.Provider value={{ jobs, deleteJob, searchParamsHandler }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
