/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { IoMdAdd } from "react-icons/io";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import {
  useGetAllTasksQuery,
  useGetDashboardStatsQuery,
} from "../redux/slices/taskApiSlice";
import { useSelector } from "react-redux";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-[#be185d]",
  "in progress": "bg-blue-600",
  completed: "bg-green-500",
};

const Tasks = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return isLoading ? (
    <div className="py-10">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <button
            onClick={() => setOpen(true)}
            disabled={user.isAdmin ? false : true}
            className="flex flex-row-reverse gap-1 items-center bg-[#fabb18] text-black rounded-lg font-semibold hover:bg-yellow-400 p-3 2xl:py-2.5 disabled:cursor-not-allowed select-none"
          >
            <IoMdAdd className="text-lg" />
            Create Task
          </button>
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className="w-full 2xl:flex justify-between gap-4 md:gap-x-12 py-4  hidden">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle
                label="In Progress"
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>
          )}

          {selected !== 1 ? (
            <BoardView />
          ) : (
            <div className="w-full ">
              <Table />
            </div>
          )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
export default Tasks;
