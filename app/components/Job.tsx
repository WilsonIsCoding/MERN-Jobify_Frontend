import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Wrapper from "../styles/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/fetchUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAllJobsContext } from "@/app/context/AllJobsContext";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}: {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  jobStatus: string;
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  const { deleteJob }: any = useAllJobsContext();
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link href={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>

          <button
            type="button"
            onClick={() => deleteJob(_id)}
            className="btn delete-btn"
          >
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
