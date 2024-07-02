/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, className, register, name, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-[#cac2b6] px-2 py-2 2xl:py-2 border placeholder-gray-600 text-gray-900 outline-none text-base focus:ring-1 ring-black",
              className
            )}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);
export default Textbox;
