"use client";
import customFetch from "@/app/utils/fetchUtils";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchContainer from "@/app/components/SearchContainer";
import JobsContainer from "@/app/components/JobsContainer";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface SearchParamsHandlerResult {
  data: object;
  searchValues: object;
}
type AllJobsContextType = {
  jobs: Array<object>;
  deleteJob: (id: string) => Promise<void>;
  searchParamsHandler: (params: object) => Promise<SearchParamsHandlerResult>;
};
const Loader = async () => {
  try {
    const response = await customFetch.get("/jobs");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
export default function Page() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { jobs, totalJobs, totalPage, currentPage } = await Loader();
        setJobs(jobs);
        setTotalJobs(totalJobs);
        setNumOfPages(totalPage);
        setCurrentPage(currentPage);
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

  const searchParamsHandler = async () => {
    try {
      let params: any = {};
      params.search = searchParams.get("search");
      params.jobStatus = searchParams.get("jobStatus");
      params.jobType = searchParams.get("jobType");
      params.sort = searchParams.get("sort");
      console.log(params);
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
      setNumOfPages(data.totalPage);
      setCurrentPage(data.currentPage);
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
    <AllJobsContext.Provider
      value={{
        jobs,
        totalJobs,
        numOfPages,
        currentPage,
        deleteJob,
        searchParamsHandler,
      }}
    >
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
