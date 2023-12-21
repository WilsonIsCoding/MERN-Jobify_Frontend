"use client";
import Wrapper from "@/app/styles/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "@/app/components";
import Link from "next/link";
import customFetch from "@/app/utils/fetchUtils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
const registerScheme = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "name must be at least 1 character long",
    })
    .max(20, {
      message: "name must be at most 20 characters long",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, {
      message: "lastName must be at least 1 character long",
    })
    .max(20, {
      message: "lastName must be at most 20 characters long",
    }),
  location: z
    .string()
    .trim()
    .min(1, {
      message: "location must be at least 1 character long",
    })
    .max(20, {
      message: "location must be at most 20 characters long",
    }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "password must be at least 8 character long",
  }),
});
const Register = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setSubmitting(true);
      const formDataFormat={
        name:formData.get('name'),
        lastName:formData.get('lastName'),
        location:formData.get('location'),
        email:formData.get('email'),
        password:formData.get('password')
      }
      const result = registerScheme.safeParse(formDataFormat);
      if (!result.success) {
        let errorMsg = "";
        result.error.issues.forEach((issue) => {
          errorMsg += `${issue.path[0]}: ${issue.message}.\n`;
        });
        toast.error(errorMsg);
        return;
      }
      // await customFetch.post("/auth/register", formData);
      toast.success("註冊成功！");
      // router.push("/login");
      setSubmitting(false);
    } catch (error: any) {
      // const { message } = error.response.data;
      console.log(error);
      // toast.error(message);
      setSubmitting(false);
      return error;
    }
  }
  return (
    <Wrapper>
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="First Name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <SubmitBtn isSubmitting={submitting} />
        <p>
          Already a member?
          <Link href="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
