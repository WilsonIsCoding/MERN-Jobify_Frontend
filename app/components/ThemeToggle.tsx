import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../styles/ThemeToggle";
import { useDashboardContext } from "@/app/context/DashboardContext";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme }: any = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
