import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground backdrop-blur-xl shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-background/80 text-foreground border-border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10",
        warning:
          "border-amber-500/50 text-amber-300 dark:border-amber-500/40 [&>svg]:text-amber-400 bg-amber-500/10",
        success:
          "border-emerald-500/50 text-emerald-300 dark:border-emerald-500/40 [&>svg]:text-emerald-400 bg-emerald-500/10",
        info: "border-blue-500/50 text-blue-300 dark:border-blue-500/40 [&>svg]:text-blue-400 bg-blue-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
