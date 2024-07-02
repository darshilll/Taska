/* eslint-disable react/prop-types */
import clsx from "clsx";

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx(
        "text-2xl font-extrabold uppercase select-none tracking-wide",
        className
      )}
    >
      {title}
    </h2>
  );
};
export default Title;
