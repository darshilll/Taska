/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useGetAllTasksQuery } from "../redux/slices/taskApiSlice";
import TaskCard from "./TaskCard";

const BoardView = () => {
  const params = useParams();

  const status = params?.status || "";
  const { data } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-10 ">
      {data?.tasks?.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};
export default BoardView;
