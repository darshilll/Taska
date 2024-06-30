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
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks size={20} />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt size={20} />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions size={20} />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions size={20} />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers size={20} />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt size={20} />,
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
          "w-full lg:3/4 flex gap-3 py-3.5 px-4 rounded-xl items-center text-gray-800 text-base",
          path === el.link.split("/")[0]
            ? "bg-black text-neutral-100"
            : "hover:bg-gray-300"
        )}
      >
        {el.icon}
        <span className="font-bold text-sm 2xl:text-lg xl:text-md">
          {el.label}
        </span>
      </Link>
    );
  };
  return (
    <main className="w-full h-full flex flex-col gap-6 p-5">
      <div className="flex gap-2 items-center">
        <span className="bg-yellow-400 p-2 rounded-full">
          <MdOutlineAddTask
            className="text-white text-2xl font-black"
            size={30}
          />
        </span>
        <span className="text-2xl font-extrabold text-black tracking-wider">
          TaskVerse
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-y-4 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </main>
  );
};
export default Sidebar;
