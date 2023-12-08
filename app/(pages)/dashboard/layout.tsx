"use client";
import React from "react";
import Wrapper from "@/app/styles/Dashboard";
import { useState, createContext, useContext } from "react";
import { SmallSidebar, BigSidebar, Navbar } from "@/app/components";
import checkDefaultTheme from '@/app/page'
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

const user = { name: "Wilson" };
export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
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
    console.log("logout");
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
}
export const useDashboardContext = () => useContext(DashboardContext);