"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import Wrapper from "@/app/styles/Dashboard";
import { checkDefaultTheme } from "@/app/page";
import customFetch from "@/app/utils/fetchUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BigSidebar, Navbar, SmallSidebar } from "@/app/components";

type DashboardContextType = {
  user: { name: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

const Loader = async () => {
  try {
    const response = await customFetch.get("/users/current-user");
    return response.data.msg;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    console.log(error);
  }
};

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [user, setUser] = useState<{ name: string }>({ name: "" });

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
    console.log(showSidebar);
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
export const useDashboardContext = () => useContext(DashboardContext);
