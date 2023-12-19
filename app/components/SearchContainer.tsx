"use client";
import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../styles/DashboardFormPage";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "@/app/utils/constants";
import Link from "next/link";
import { useState } from "react";
import { useAllJobsContext } from "@/app/context/AllJobsContext";
const searchDefault = "a";
const jobStatusDefault = "all";
const jobTypeDefault = "all";
const sortDefault = "newest";
const SearchContainer = () => {
  const { searchParamsHandler }: any = useAllJobsContext();
  const [searchQuery, setSearchQuery] = useState({
    search: searchDefault,
    jobStatus: jobStatusDefault,
    jobType: jobTypeDefault,
    sort: sortDefault,
  });
  const handleChange = (event: any) => {
    setSearchQuery({
      ...searchQuery,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={searchDefault}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatusDefault}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobTypeDefault}
            onChange={handleChange}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sortDefault}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={handleChange}
          />

          <Link href="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <button
            className="btn form-btn"
            type="button"
            onClick={() => {
              searchParamsHandler(searchQuery);
            }}
          >
            Search
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
