"use client";
import Wrapper from "../styles/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../(pages)/dashboard/layout";
// import LogoutContainer from './LogoutContainer';
// import ThemeToggle from './ThemeToggle';
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          {/* <ThemeToggle />
          <LogoutContainer /> */}
        </div>
      </div>
      Navbar
    </Wrapper>
  );
};
export default Navbar;
