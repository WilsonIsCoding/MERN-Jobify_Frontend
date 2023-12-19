"use client";
import Wrapper from "../styles/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "@/app/context/DashboardContext";
import LogoutContainer from "@/app/components/LogoutContainer";
import ThemeToggle from "@/app/components/ThemeToggle";
const Navbar = () => {
  const { toggleSidebar }: any = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
