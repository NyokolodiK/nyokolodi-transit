import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "success" | "whatsapp" | "secondary";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-[#0E4D25] hover:bg-[#083E1A] text-white shadow-md hover:shadow-lg",
  success: "bg-[#146C36] hover:bg-[#0E4D25] text-white shadow-md hover:shadow-lg",
  whatsapp: "bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md",
  secondary: "border border-gray-200 text-gray-600 hover:bg-gray-50",
};

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  variant = "primary",
  isLoading = false,
  loadingText = "Sending...",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(buttonBase, "py-3.5 px-6", buttonVariants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  className?: string;
}

export function ButtonLink({
  variant = "whatsapp",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonBase, "py-3 px-6", buttonVariants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export default Button;
