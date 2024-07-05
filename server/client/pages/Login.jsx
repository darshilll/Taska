/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loader from "../components/Loader";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gradient-to-b from-[#cacbcd] to-[#323841] ">
      <div className="lg:w-auto flex gap-0 lg:gap-40 flex-col lg:flex-row items-center justify-center">
        {/* left side */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="md:max-w-lg 2xl:max-w-3xl flex flex-col items-center gap-5 -mt-5  lg:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base text-black">
              Manage all your task in one place!
            </span>
            <span className="flex justify-center items-center gap-3 -mt-2">
              <img
                src="/assets/images/tasks.png"
                alt="taska"
                className="h-9 w-9 lg:w-14 lg:h-14 "
              />
              <p className="font-extrabold text-4xl text-[#dadde0] lg:text-6xl tracking-tight">
                taska
              </p>
            </span>
            <p className="flex flex-col lg:gap-3 text-3xl md:text-4xl lg:text-6xl font-black text-center text-black select-none -mt-3 lg:mt-0">
              <span className="flex justify-center items-center gap-2 lg:gap-3">
                Your <p className="text-black">digital</p>
              </span>
              <span className="flex justify-center items-center gap-2 lg:gap-3 text-[#dadde0]">
                task <p className="text-black">assistant</p>
              </span>
            </p>

            <div className="hidden lg:block">
              <div className="cell">
                <div className="circle rotate-in-up-left"></div>
              </div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="md:1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-[#f8f8f8] p-8 lg:px-10 lg:py-12"
          >
            <div>
              <p className="text-black text-lg md:text-xl text-center font-bold -mt-3">
                Welcome Back, Task Master
              </p>
              <p className="text-center text-sm md:text-base text-gray-700">
                Continue where you left off.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Email"
                type="email"
                name="email"
                className="w-full rounded-lg"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="Password"
                type="password"
                name="password"
                className="w-full rounded-lg"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  label="Log in"
                  className="w-full h-10 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
                />
              )}
              <p className="text-center text-md">
                Don't have an account?
                <Link
                  to="/signup"
                  className="hover:text-blue-600 hover:underline ml-1"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
