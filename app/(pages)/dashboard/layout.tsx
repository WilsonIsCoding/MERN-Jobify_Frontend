"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/app/styles/Dashboard";
import DashboardContext from "@/app/context/DashboardContext";
import checkDefaultTheme from "@/app/utils/checkDefaultTheme";
import { useRouter } from "next/navigation";
import { SmallSidebar, BigSidebar, Navbar } from "@/app/components";
import customFetch from "@/app/utils/fetchUtils";
import { toast } from "react-toastify";
const Loader = async () => {
  try {
    const response = await customFetch.get("/users/current-user");
    return response.data.msg;
  } catch (error) {
    toast.error("You are not authorized to view this page");
  }
};
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [user, setUser] = useState<{
    name: string;
    lastName: string;
    email: string;
    location: string;
  }>({ name: "", lastName: "", email: "", location: "" });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await Loader();
      setUser(userData);
    };
    fetchData();
  }, []);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", String(newDarkTheme));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
    router.push("/");
  };

  return (
    <>
      <DashboardContext.Provider
        value={{
          user,
          showSidebar,
          isDarkTheme,
          toggleDarkTheme,
          toggleSidebar,
          logoutUser,
        }}
      >
        <Wrapper>
          <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
              <Navbar />
              <div className="dashboard-page">{children}</div>
            </div>
          </main>
        </Wrapper>
      </DashboardContext.Provider>
    </>
  );
};

export default Layout;
