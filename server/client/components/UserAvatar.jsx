/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import { toast } from "sonner";
import { logout } from "../redux/slices/authSlice";
import AddUser from "./task/AddUser";
import ChangePasswords from "./ChangePasswords";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());

      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex gap-3">
            <Menu.Button className="w-10 h-10 2xl:w-11 2xl:h-11 items-center justify-center rounded-full bg-black -mt-1 hover:bg-[#fabb18]">
              <span className="text-white font-bold">
                {getInitials(user?.name)}
              </span>
            </Menu.Button>
            <div className="2xl:flex xl:flex flex-col -mt-1 tracking-wide hidden">
              <span className="font-bold text-[18px]">{user?.name}</span>
              <span className="text-gray-500 -mt-1">{user?.title}</span>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-black/5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className="hover:text-[#fabb18] group flex w-full items-center rounded-md p-2"
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className="hover:text-[#fabb18] group flex w-full items-center rounded-md p-2"
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className="text-red-600 group flex w-full items-center rounded-md px-2 hover:text-red-700"
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePasswords open={openPassword} setOpenPassword={setOpenPassword} />
    </>
  );
};
export default UserAvatar;
