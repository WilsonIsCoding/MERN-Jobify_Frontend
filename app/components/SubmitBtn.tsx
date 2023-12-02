"use client";
import React from "react";
interface SubmitBtnProps {
  formBtn?: string;
}
const SubmitBtn: React.FC<SubmitBtnProps> = ({ formBtn }) => {
  return (
    <button type="submit" className={`btn btn-block ${formBtn && "form-btn"} `}>
      submit
    </button>
  );
};
export default SubmitBtn;
