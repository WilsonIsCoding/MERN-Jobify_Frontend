"use client";
import Link from "next/link";
import Wrapper from "../../styles/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "@/app/components";
import customFetch from "../../utils/fetchUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const loginHandler = async ({ e }: { e: any }) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await customFetch.post("/auth/login", formData);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      const { message } = error?.response?.data;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Wrapper>
      <form onSubmit={loginHandler} className="form">
        <Logo />
        <h4>login</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue="wilson@gmail.com"
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          defaultValue="123456"
          onChange={handleChange}
        />
        <SubmitBtn isSubmitting={submitting} />
        <button
          type="button"
          className="btn btn-block"
          // onClick={() => console.log("")}
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
