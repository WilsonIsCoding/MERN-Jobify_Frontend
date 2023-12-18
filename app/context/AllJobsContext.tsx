import { createContext } from "react";

type AllJobsContextType = {
  jobs: Array<object>;
  deleteJob: (id: string) => Promise<void>;
  searchParamsHandler: (params: object) => Promise<SearchParamsHandlerResult>;
};
const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
export default AllJobsContext;
