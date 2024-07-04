/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdDelete,
  MdOutlineRestore,
} from "react-icons/md";
import Title from "../components/Title";
import { useState } from "react";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import clsx from "clsx";
import { toast } from "sonner";
import ConfirmatioDialog from "../components/task/Dialogs";

import {
  useDeleteRestoreTaskMutation,
  useGetAllTasksQuery,
} from "../redux/slices/taskApiSlice";
import Loader from "../components/Loader";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetAllTasksQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const deleteRestoreHandler = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll",
          }).unwrap();
          break;
        case "restore":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap();
          break;
      }

      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permenantly delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading)
    return (
      <div className="py-10">
        <Loader />
      </div>
    );

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left text-sm lg:text-base">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 hidden md:table-cell line-clamp-1">Modified On</th>
        <th className="py-2 text-end">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10 text-sm lg:text-base">
      <td className="py-2 ">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-3 h-3 lg:w-4 lg:h-4 p-1 rounded-full",
              TASK_TYPE[item.stage]
            )}
          />
          <p className="w-full line-clamp-2 text-black ">{item?.title}</p>
        </div>
      </td>

      <td className="py-2 capitalize">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className="">{item?.priority}</span>
        </div>
      </td>

      <td className="py-2 capitalize text-center md:text-start">
        {item?.stage}
      </td>
      <td className="py-2 text-sm hidden md:table-cell max-w-xs ">
        <span className="block truncate">
          {new Date(item?.date).toDateString()}
        </span>
      </td>

      <td className="py-2 flex justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6 select-none">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" />
          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label="Restore all"
              icon={<MdOutlineRestore className="text-lg flex" size={22} />}
              className="flex gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5 text-left"
              onClick={() => restoreAllClick()}
            />
            <Button
              label="Delete all"
              icon={
                <MdDelete className="text-lg  flex text-red-500" size={22} />
              }
              className="flex gap-1 items-center text-red-500 text-sm md:text-base rounded-md 2xl:py-2.5 text-left"
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className="bg-[#f8f8f8] px-2 md:px-6 py-4 shadow-md rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.tasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <AddUser open={open} setOpen={setOpen} /> */}

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};
export default Trash;
