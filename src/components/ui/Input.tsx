import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, className, ...props },
  ref
) {
  const field = (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]",
        icon && "pl-9",
        className
      )}
      {...props}
    />
  );

  if (!icon) return field;

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-3 text-gray-400">
        {icon}
      </span>
      {field}
    </div>
  );
});

export default Input;
