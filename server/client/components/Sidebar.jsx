/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    link: "dashboard",
    icon: <MdDashboard size={25} />,
  },
  {
    link: "tasks",
    icon: <FaTasks size={25} />,
  },
  {
    link: "completed/completed",
    icon: <MdTaskAlt size={25} />,
  },
  {
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions size={25} />,
  },
  {
    link: "todo/todo",
    icon: <MdOutlinePendingActions size={25} />,
  },
  {
    link: "team",
    icon: <FaUsers size={25} />,
  },
  {
    link: "trashed",
    icon: <FaTrashAlt size={25} />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-14 h-14 lg:3/4 flex gap-3 rounded-full items-center justify-center text-base",
          path === el.link.split("/")[0]
            ? "bg-white text-black"
            : "hover:bg-white hover:text-black text-white"
        )}
      >
        {el.icon}
      </Link>
    );
  };
  return (
    <main className="w-full h-full flex flex-col gap-5 p-6 2xl:border-r-4 2xl:border-gray-500 xl:border-r-4 xl:border-gray-500 md:border-r-4 md:border-gray-500">
      <div className="flex-1 flex flex-col gap-y-4 py-8 -mt-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </main>
  );
};
export default Sidebar;
