import React from "react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const NextBtn: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-p_blue-500 min-w-[100px] text-p_white-300 hover:bg-p_white-300 hover:text-p_blue-500 cursor-pointer py-3 px-2 rounded-full border-2 border-transparent hover:border-p_blue-500 transition-all duration-200 ease-in-out font-semibold disabled:bg-p_black-200 disabled:cursor-not-allowed disabled:hover:text-p_white-300 disabled:hover:border-transparent"
    >
      <span>Next</span>
    </button>
  );
};

export default NextBtn;
