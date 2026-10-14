import React from "react";
import { AlertTriangle } from "lucide-react";

interface AlertProps {
  children: React.ReactNode;
}

export default function Alert({ children }: AlertProps) {
  return (
    <p className="flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </p>
  );
}
