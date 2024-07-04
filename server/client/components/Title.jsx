/* eslint-disable react/prop-types */
import clsx from "clsx";

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx(
        "md:text-2xl text-xl font-extrabold uppercase select-none tracking-wide p-2",
        className
      )}
    >
      {title}
    </h2>
  );
};
export default Title;
