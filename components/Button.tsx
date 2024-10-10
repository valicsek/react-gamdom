import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant = "primary", disabled = false }) => {
  const variantClasses = {
    primary: "bg-[var(--primary-color)] text-[var(--secondary-color)]",
    secondary: "bg-[var(--secondary-color)] text-white",
    tertiary: "bg-[var(--tertiary-color)] text-[var(--primary-color)]",
  };

  return (
    <button
      className={`px-8 text-md py-2 rounded-lg font-bold ${variantClasses[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
