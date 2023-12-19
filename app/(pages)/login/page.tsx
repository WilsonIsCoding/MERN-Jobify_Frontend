"use client";
import Link from "next/link";
import Wrapper from "../../styles/RegisterAndLoginPage";
import { Logo, FormRow } from "@/app/components";
import customFetch from "../../utils/fetchUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "@/app/serverHook/setCookie";
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
  const exploreLogin = async () => {
    const data = {
      email: "test@gmail.com",
      password: "secret123",
    };
    try {
      const res = await customFetch.post("/auth/login", data);
      router.push("/dashboard");
    } catch (error) {
      const { message } = (error as any)?.response?.data;
      toast.error(message);
    }
  };
  const loginHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      setSubmitting(true);
      const res = await customFetch.post("/auth/login", formData);
      await setCookie("token", res.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      const { message } = (error as any)?.response?.data;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Wrapper>
      <form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" onChange={handleChange} />
        <FormRow type="password" name="password" onChange={handleChange} />

        <button type="button" onClick={loginHandler} className="btn btn-block">
          Submit
        </button>
        <button type="button" onClick={exploreLogin} className="btn btn-block">
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
