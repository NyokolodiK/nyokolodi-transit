import React from "react";

interface ModalHeaderProps {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}

export default function ModalHeader({ eyebrow, title, icon }: ModalHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-11 h-11 rounded-2xl bg-[#0E4D25] text-white flex items-center justify-center shadow-md flex-shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-[11px] font-bold text-[#199A3F] uppercase tracking-wider">
          {eyebrow}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h3>
      </div>
    </div>
  );
}
