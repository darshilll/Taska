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
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          className="text-2xl text-gray-500 block md:hidden"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <BsLayoutThreeColumns />
        </button>
      </div>
      <div className="flex 2xl:gap-24 gap-2 items-center">
        <UserAvatar user={user} />

        <NotificationPanel />
      </div>
    </div>
  );
};
export default Navbar;
