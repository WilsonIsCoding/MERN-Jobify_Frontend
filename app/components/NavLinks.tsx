"use client";
import { useDashboardContext } from "../(pages)/dashboard/layout";
import links from "../utils/links";
import Link from "next/link";

const NavLinks = ({ isBigSidebar }: { isBigSidebar: boolean }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user || "user";
        if (path === "admin" && role !== "admin") return;
        return (
          <Link
            href={path}
            key={path}
            className="nav-link"
            onClick={() => (isBigSidebar ? null : toggleSidebar())}
          >
            <span className="icon">{icon}</span>
            {text}
          </Link>
        );
      })}
    </div>
  );
};
export default NavLinks;
