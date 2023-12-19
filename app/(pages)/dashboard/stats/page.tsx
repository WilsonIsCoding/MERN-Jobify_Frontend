"use client";
import { useEffect, useState } from "react";
import { ChartsContainer, StatsContainer } from "@/app/components";
import customFetch from "@/app/utils/fetchUtils";
import { toast } from "react-toastify";
const fetchStatsData = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    throw error;
  }
};

export default function Page() {
  const [statsData, setStatsData] = useState({
    defaultStats: null,
    monthlyApplications: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { defaultStats, monthlyApplications } = await fetchStatsData();
        setStatsData({ defaultStats, monthlyApplications });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <StatsContainer defaultStats={statsData.defaultStats} />
      {statsData.monthlyApplications?.length > 1 && (
        <ChartsContainer data={statsData.monthlyApplications} />
      )}
    </>
  );
}
