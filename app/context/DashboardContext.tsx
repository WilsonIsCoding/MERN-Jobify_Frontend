"use client";
import React, { createContext, useContext } from "react";

type DashboardContextType = {
  user: { name: string; lastName: string; email: string; location: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardContext;
