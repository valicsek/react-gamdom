import React from "react";

interface InputProps {
  className?: string;
  type?: "text" | "number" | "email" | "password" | "select";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  prefix?: string;
}

const Input: React.FC<InputProps> = ({ className, type = "text", placeholder = "Enter your text", value, onChange, prefix, options }) => {
  return (
    <div className={`flex flex-row items-center bg-[var(--body-main)] text-md p-2 rounded-lg font-bold ${className}`}>
      {prefix && <span className="text-white text-md">{prefix}</span>}
      {type != "select" && (
        <input type={type} className={`px-8 bg-transparent w-full focus:outline-none ${className}`} placeholder={placeholder} value={value} onChange={onChange} />
      )}
      {type == "select" && (
        <select className={`bg-transparent w-full focus:outline-none ${className}`} onChange={onChange} value={value}>
          <option value="" disabled>
            Select element
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Input;
