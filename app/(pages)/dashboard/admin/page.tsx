"use client";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import customFetch from "@/app/utils/fetchUtils";
import Wrapper from "@/app/styles/StatsContainer";
import { toast } from "react-toastify";
import StatItem from "@/app/components/StatItem";
import { useEffect, useState } from "react";
export const fetchUserData = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
  }
};
export default function Admin() {
  const [adminData, setAdminData] = useState({ users: 0, job: 0 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={adminData?.users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={adminData?.job}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
}
