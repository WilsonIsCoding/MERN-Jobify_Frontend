"use client";
import { FaTimes } from "react-icons/fa";
import Wrapper from "../styles/SmallSidebar";
import { useDashboardContext } from "@/app/context/DashboardContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar }: any = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={showSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
