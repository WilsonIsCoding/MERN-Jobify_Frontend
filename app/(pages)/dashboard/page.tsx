"use client";
import { useState } from "react";
import Wrapper from "@/app/styles/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "@/app/components";
import { JOB_STATUS, JOB_TYPE } from "@/app/utils/constants";
import customFetch from "@/app/utils/fetchUtils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobStatus: "",
    jobType: "",
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await customFetch.post("/jobs", formData);
      toast.success("Job added successfully");
      router.push("/dashboard/all-jobs");
      return;
    } catch (error) {
      console.log(error);
      toast.error((error as any)?.response?.data?.message);
      return error;
    } finally {
      setFormData({
        position: "",
        company: "",
        jobLocation: "",
        jobStatus: JOB_STATUS.PENDING,
        jobType: JOB_TYPE.FULL_TIME,
      });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Wrapper>
      <form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={formData.position}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={formData.company}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={formData.jobLocation}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-block form-btn"
          >
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
