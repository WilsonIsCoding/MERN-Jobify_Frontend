"use client";
import Wrapper from "@/app/styles/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "@/app/components";
import Link from "next/link";
import customFetch from "@/app/utils/fetchUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const Register = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
  });
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await customFetch.post("/auth/register", formData);
      toast.success("註冊成功！");
      router.push("/login");
      setSubmitting(false);
    } catch (error: any) {
      const { message } = error.response.data;
      toast.error(message);
      setSubmitting(false);
      return error;
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelText="First Name"
          onChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          onChange={handleChange}
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          onChange={handleChange}
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          onChange={handleChange}
        />
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
