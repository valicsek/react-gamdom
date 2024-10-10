import React from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div data-testid="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--bg-main-elements)] rounded-lg shadow-lg p-5 max-w-sm w-full flex flex-col gap-4">
        <div className="header flex flex-row justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-white" />
          </button>
        </div>
        {children}
        <slot name="footer" />
      </div>
    </div>
  );
};

export default Modal;
