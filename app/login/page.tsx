"use client";
import Link from "next/link";
import Wrapper from "../styles/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "@/app/components";
// import customFetch from '../utils/customFetch';
// import { toast } from 'react-toastify';

export default function Page() {
  return (
    <Wrapper>
      <form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button
          type="button"
          className="btn btn-block"
          onClick={() => console.log("")}
        >
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link href="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}