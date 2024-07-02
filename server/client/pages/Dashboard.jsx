/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import Loader from "../components/Loader";
import Chart from "../components/Chart";
import { PRIOTITYSTYELS, TASK_TYPE, BGS, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetDashboardStatsQuery } from "../redux/slices/taskApiSlice";
import { useSelector } from "react-redux";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-400 select-none">
      <tr className="text-black text-left ">
        <th className="py-2">Task Title</th>
        <th className="py-2 ">Priority</th>
        <th className="py-2 ">Team</th>
        <th className="py-2 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-400  hover:bg-gray-300/15 select-none">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="text-black text-base">{task.title}</p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span>{task.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-9 h-9 rounded-full flex items-center text-white justify-center text-sm font-semibold -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 hidden md:block">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full bg-[#f8f8f8] px-2 md:px-4 pt-4 pb-4 shadow-md rounded-xl">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const TableHeader = () => (
    <thead className="border-b border-gray-400">
      <tr className="text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-400 text-gray-600 hover:bg-gray-300/15">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-red-600">
            <span className="text-center font-bold">
              {getInitials(user?.name)}
            </span>
          </div>
          <div className="text-black">
            <p>{user.name}</p>
            <span className="text-xs ">{user.role}</span>
          </div>
        </div>
      </td>
      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );
  return (
    <div className="w-full md:w-2/3 bg-[#f8f8f8] px-2 md:px-6 h-fit pb-4  shadow-md rounded-xl">
      <table className="w-full mb-5">
        <TableHeader />
        <tbody>
          {data?.users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();

  const { user } = useSelector((state) => state.auth);

  if (isLoading)
    return (
      <div className="py-10">
        <Loader />
      </div>
    );

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper size={23} />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: data?.tasks["completed"] || 0,
      icon: <MdAdminPanelSettings size={23} />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: data?.tasks["in progress"] || 0,
      icon: <LuClipboardEdit size={23} />,
      bg: "bg-[#be185d]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: data?.tasks["todo"] || 0,
      icon: <FaArrowsToDot size={23} />,
      bg: "bg-purple-700",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-30 bg-[#000000] p-7 shadow-md shadow-gray-500 rounded-3xl flex items-center justify-between">
        <div className="h-full flex flex-col justify-between text-white">
          <p className="text-base font-bold">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-300">{"11% last month"}</span>
        </div>
        <div
          className={clsx(
            "w-12 h-12 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <main className="h-full w-full text-black">
      <div className="flex mb-6 -mt-3 select-none">
        <div className="flex rounded-3xl px-10 py-3  bg-[#f8f8f8] relative 2xl:w-full">
          <p className="text-[18px] 2xl:text-[28px] xl:text-[25px] md:[22px]">
            Hello, {user?.name?.split(" ")[0]}!
            <span className=" text-[20px] font-bold 2xl:text-[35px] 2xl:font-extrabold ">
              <p>You've got</p>
              <p className="-mt-2 mb-2">{data?.totalTasks} tasks today 📝</p>
            </span>
          </p>
          <img
            src="assets/images/image.png"
            alt="person"
            className=" max-w-xl relative z-20  left-1/2 bottom-3 h-44 w-60 object-fill hidden md:block"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className="w-full bg-[#f8f8f8] rounded-3xl my-10  shadow-sm">
        <h4 className="text-2xl font-bold p-4 uppercase">Chart by Priority</h4>
        <Chart data={data?.graphData} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}

        <TaskTable tasks={data?.last10Task} />

        {/* right */}
        {user.isAdmin ? <UserTable /> : ""}
      </div>
    </main>
  );
};
export default Dashboard;
