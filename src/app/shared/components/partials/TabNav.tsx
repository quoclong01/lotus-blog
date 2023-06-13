import React from "react";

interface ITabNavProps {
  id: string;
  content: string | React.ReactNode;
  activeTab: string;
  setActiveTab: any
}

const TabNav = ({ id, content, activeTab, setActiveTab }: ITabNavProps) => {
  const handleClick = () => {
    setActiveTab(id);
  }

  return (
    <li
      onClick={handleClick}
      className={activeTab === id ? "tab-active tab-item" : "tab-item"}
    >
      {content}
    </li>
  );
};

export default TabNav;
