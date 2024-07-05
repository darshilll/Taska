/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center  px-4 py-3 2xl:py-4 sticky z-10 top-0 bg-white">
      <div className="flex gap-4">
        <button
          className="text-2xl block md:hidden"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <GiHamburgerMenu size={27} />
        </button>
        <span className="flex justify-center items-center gap-1 ">
          <img
            src="/assets/images/tasks.png"
            alt="taska"
            className="h-6 w-6 lg:w-10 lg:h-10 lg:ml-6 tracking-tight"
          />
          <p className="text-2xl lg:text-3xl font-bold">taska</p>
        </span>
      </div>

      <div className="flex 2xl:gap-6 gap-2 items-center">
        <NotificationPanel />
        <UserAvatar user={user} />
      </div>
    </div>
  );
};
export default Navbar;
