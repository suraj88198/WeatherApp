import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const baseStyle = "px-4 py-2 rounded-full font-semibold transition duration-300";
    const variants = {
      primary: "bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg",
      outline: "border border-white hover:bg-white hover:text-black text-white",
    };
    return (
      <button
        className={cn(baseStyle, variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
