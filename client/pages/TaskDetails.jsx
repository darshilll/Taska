/* eslint-disable no-unused-vars */
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { toast } from "sonner";
import moment from "moment";
import { GrInProgress } from "react-icons/gr";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { useState } from "react";
import { tasks } from "../src/assets/data";
import Tabs from "../components/Tabs";
import clsx from "clsx";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Activities from "../components/Activities";
import { useGetSingleTaskQuery } from "../redux/slices/taskApiSlice";
import Loader from "../components/Loader";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

export const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

export const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleTaskQuery(id);

  const [selected, setSelected] = useState(0);
  const task = data?.task;

  if (isLoading)
    return (
      <div className="py-10">
        <Loader />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl font-extrabold uppercase">{task?.title}</h1>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 shadow-md p-8 overflow-y-auto">
              <div className="w-full md:w-1/2 space-y-6">
                {/* LEFT */}
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[task?.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase">{task?.priority} Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[task.stage]
                      )}
                    />
                    <span className="text-black uppercase">{task?.stage}</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  Created At: {new Date(task?.date).toDateString()}
                </p>
                <div className="flex items-center gap-8 p-4 border-y border-gray-300">
                  <div className="space-x-2">
                    <span className="font-bold">Assets: </span>
                    <span>{task?.assets?.length}</span>
                  </div>
                  <span className="text-gray-500">|</span>
                  <div className="space-x-2">
                    <span className="font-bold">Sub-Task :</span>
                    <span>{task?.subTasks?.length}</span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-700 font-bold text-sm">TASK TEAM</p>
                  <div className="space-y-3">
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-300"
                      >
                        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-[#fabb18]">
                          <span className="text-center font-bold">
                            {getInitials(m?.name)}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500">{m.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-700 font-bold text-sm">SUB-TASKS</p>
                  <div className="space-y-8">
                    {task?.subTasks?.map((el, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                          <MdTaskAlt className="text-violet-600" size={26} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex gap-2 items-center">
                            <span className="text-sm text-gray-500">
                              {new Date(el?.date).toDateString()}
                            </span>
                            <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                              {el?.tag}
                            </span>
                          </div>
                          <p className="text-gray-700">{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-lg font-semibold">ASSETS</p>
                <div className=" w-full grid grid-cols-2 gap-4">
                  {task?.assets?.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={task.title}
                      className="w-full rounded h-30 md:h-36 2xl:h-60 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities
              activity={data?.task?.activities}
              id={id}
              refetch={refetch}
            />
          </>
        )}
      </Tabs>
    </div>
  );
};

export default TaskDetails;
