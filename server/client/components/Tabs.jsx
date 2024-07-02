/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ tabs, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-7 rounded-xl p-1 ">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 p-3 text-base font-bold leading-5 bg-white select-none",
                  selected
                    ? "text-black border-b-2 border-black"
                    : "text-black hover:text-gray-500"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default Tabs;
