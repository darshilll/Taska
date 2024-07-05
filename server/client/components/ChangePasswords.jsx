/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Textbox from "./Textbox";
import Loader from "./Loader";
import Button from "./Button";
import { useChangePasswordMutation } from "../redux/slices/userApiSlice";
import ModalWrapper from "./task/ModalWrapper";
import { Dialog } from "@headlessui/react";

const ChangePasswords = ({ open, setOpenPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password doesn't match");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Password changed");

      setTimeout(() => {
        setOpenPassword(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpenPassword}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm new password is required!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loader />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-black rounded-lg px-8 text-sm font-semibold text-white hover:bg-gray-800"
                label="Save"
              />

              <button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpenPassword(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};
export default ChangePasswords;
