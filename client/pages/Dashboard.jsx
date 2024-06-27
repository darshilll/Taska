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
                "w-9 h-9 rounded-full text-black flex items-center justify-center text-sm font-bold -mr-1",
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
      <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4  shadow-md rounded">
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
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/15">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-red-500">
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
    <div className="w-full md:w-2/3 bg-white px-2 md:px-6 h-fit pb-4  shadow-md rounded">
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
      <div className="w-full h-30 bg-[#fabb18] p-5 shadow-xl rounded-2xl flex items-center justify-between">
        <div className="h-full flex flex-col justify-between text-black">
          <p className="text-base font-bold">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm">{"11% last month"}</span>
        </div>
        <div
          className={clsx(
            "w-11 h-11 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full  text-black">
      <p className="text-gray-500 text-[18px] 2xl:text-[28px] xl:text-[25px] md:[22px]  -mt-2 2xl:-mt-4">
        Hello, {user?.name?.split(" ")[0]}!
      </p>
      <div className=" text-[20px] font-bold 2xl:text-[35px] 2xl:font-extrabold tracking-wide">
        <p>You've got</p>
        <p className="-mt-2 mb-2">{data?.totalTasks} tasks today 📝</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className="w-full bg-white my-12 rounded shadow-sm">
        <h4 className="text-xl font-semibold p-4 uppercase">
          Chart by Priority
        </h4>
        <Chart data={data?.graphData} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}

        <TaskTable tasks={data?.last10Task} />

        {/* right */}
        <UserTable />
      </div>
    </div>
  );
};
export default Dashboard;
