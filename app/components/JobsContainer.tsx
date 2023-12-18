import Wrapper from "../styles/JobsContainer";
import Job from "./Job";
import { useAllJobsContext } from "../(pages)/dashboard/all-jobs/page";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { jobs, totalJobs, numOfPages } = useAllJobsContext();
  if (jobs?.length == 0) {
    return <Wrapper>No Jobs To Display...</Wrapper>;
  } else {
    return (
      <Wrapper>
        <h5>
          {totalJobs} job{jobs.length > 1 && "s"} found
        </h5>
        <div className="jobs">
          {jobs?.map((job: object) => {
            return <Job key={job._id} {...job} />;
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    );
  }
};
export default JobsContainer;
