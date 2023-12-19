"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import customFetch from "@/app/utils/fetchUtils";

interface SearchParamsHandlerResult {
  data: object;
  searchValues: object;
}
interface Job {
  company: string;
  createdAt: string;
  createdBy: string;
  jobLocation: string;
  jobStatus: string;
  jobType: string;
  position: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

type AllJobsContextType = {
  jobs: Array<object>;
  totalJobs: number;
  numOfPages: number;
  currentPage: number;
  deleteJob: (id: string) => Promise<void>;
  searchParamsHandler: (params: object) => Promise<SearchParamsHandlerResult>;
};

const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
const Loader = async () => {
  try {
    const response = await customFetch.get("/jobs");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
interface AllJobsContextProviderProps {
  children: React.ReactNode;
}
const AllJobsContextProvider: React.FC<AllJobsContextProviderProps> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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
      toast.error((error as any)?.response?.data?.msg);
    }
    return;
  };

  const searchParamsHandler = async (
    params: object
  ): Promise<SearchParamsHandlerResult> => {
    try {
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
      toast.error((error as any).response.data.msg);
      throw { data: {}, searchValues: {} };
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
      {children}
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobsContextProvider;
