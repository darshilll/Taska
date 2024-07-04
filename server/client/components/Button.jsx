/* eslint-disable react/prop-types */

import clsx from "clsx";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx("p-2 lg:px-3 lg:py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};
export default Button;
