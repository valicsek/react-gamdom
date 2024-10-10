import React from "react";
import { IconType } from "react-icons";

interface SportFilterItemProps {
  title: string;
  Icon: IconType;
  isActive: boolean;
  onClick: () => void;
}

const SportFilterItem: React.FC<SportFilterItemProps> = ({ title, Icon, isActive, onClick }) => {
  return (
    <div
      data-testid="sport-filter-item"
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-full border-2 cursor-pointer m-1 ${isActive ? "border-[var(--text-active)] font-bold" : "border-gray-500"}`}
    >
      <Icon size={24} className="text-white" />
      {isActive && <span className="px-4">{title}</span>}
    </div>
  );
};

export default SportFilterItem;
