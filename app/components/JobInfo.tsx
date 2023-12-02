import Wrapper from "../styles/JobInfo";
import React from "react";
interface JobInfoProps {
  icon: string;
  text: string;
}
const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
