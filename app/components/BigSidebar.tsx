import Wrapper from '../styles/BigSidebar';
// import NavLinks from './NavLinks';
import Logo from './Logo';
// import { useDashboardContext } from '../pages/Dashboard';
const BigSidebar = () => {
  // const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      {/* <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div> */}
      BigSideBar
    </Wrapper>
  );
};
export default BigSidebar;
