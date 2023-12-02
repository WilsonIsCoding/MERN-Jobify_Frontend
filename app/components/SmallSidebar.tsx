import { FaTimes } from "react-icons/fa";
import Wrapper from "../styles/SmallSidebar";
import { useDashboardContext } from "../(pages)/dashboard/layout";
import Logo from "./Logo";

// import NavLinks from './NavLinks';
const SmallSidebar = () => {
  const data = useDashboardContext();
  console.log(data?.showSidebar);
  return (
    <>
      {/* <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper> */}
      <Wrapper>small sidebar<FaTimes/></Wrapper>
    </>
  );
};
export default SmallSidebar;
