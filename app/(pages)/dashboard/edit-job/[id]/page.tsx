"use client";
import { FormRow, FormRowSelect } from "@/app/components";
import Wrapper from "@/app/styles/DashboardFormPage";
import customFetch from "@/app/utils/fetchUtils";
import { JOB_STATUS, JOB_TYPE } from "@/app/utils/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const getJob = async ({ id }: { id: string }) => {
  try {
    const formData = await customFetch.get(`/jobs/${id}`);
    const { job } = formData.data;
    return job;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export default function Page({ params }: { params: { id: string } }) {
  const [job, setJob] = useState({
    company: "",
    jobLocation: "",
    position: "",
    jobStatus: "",
    jobType: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const router = useRouter();
  const [jobFormData, setJobFormData] = useState({
    company: "",
    jobLocation: "",
    position: "",
    jobStatus: "",
    jobType: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getJob({ id });
        setJob(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = (event: any) => {
    setJobFormData({
      ...jobFormData,
      [event.target.name]: event.target.value,
    });
  };
  const editHandler = async () => {
    try {
      const res = await customFetch.patch(`/jobs/${params.id}`, jobFormData);
      toast.success("Job edited successfully");
      router.push("/dashboard/all-jobs");
    } catch (error) {
      toast.error((error as any).response.data.message);
      return error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
            onChange={handleChange}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
            onChange={handleChange}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-block formBtn form-btn"
            onClick={editHandler}
          >
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
