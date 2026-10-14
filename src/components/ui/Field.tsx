import React from "react";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Field({ label, error, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
