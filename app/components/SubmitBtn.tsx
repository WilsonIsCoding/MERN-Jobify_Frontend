"use client";
import React from "react";
interface SubmitBtnProps {
  formBtn?: string;
  isSubmitting: boolean;
}
const SubmitBtn: React.FC<SubmitBtnProps> = ({ formBtn, isSubmitting }) => {
  const submitText = isSubmitting ? "submitting..." : "submit";
  return (
    <button type="submit" className={`btn btn-block ${formBtn && "form-btn"} `}>
      {submitText}
    </button>
  );
};
export default SubmitBtn;
