import React from "react";

interface ITabContentProps {
  id: string;
  activeTab: string;
  children: any;
}

const TabContent = ({ id, activeTab, children }: ITabContentProps) => {
  return activeTab === id ? (
    <div className="tab-content">{children}</div>
  ) : null;
};

export default TabContent;
