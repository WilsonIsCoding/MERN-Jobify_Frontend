import Wrapper from "../styles/JobsContainer";
import Job from "./Job";
import { useAllJobsContext } from "../(pages)/dashboard/all-jobs/page";
const JobsContainer = () => {
  const { jobs } = useAllJobsContext();
  if (jobs.length == 0) {
    return <Wrapper>No Jobs To Display...</Wrapper>;
  } else {
    return (
      <Wrapper>
      <div className="jobs">
        {jobs.map((job:object) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      </Wrapper>
    );
  }
};
export default JobsContainer;
