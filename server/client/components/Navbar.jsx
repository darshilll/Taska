/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { MdOutlineSearch } from "react-icons/md";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { useRegisterMutation } from "../redux/slices/authApiSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center  px-4 py-3 2xl:py-4 sticky z-50 top-0 bg-white">
      <div className="flex gap-4">
        <button
          className="text-2xl text-gray-500 block md:hidden"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <BsLayoutThreeColumns />
        </button>
      </div>
      <div className="flex 2xl:gap-6 gap-2 items-center">
        <NotificationPanel />
        <UserAvatar user={user} />
      </div>
    </div>
  );
};
export default Navbar;
