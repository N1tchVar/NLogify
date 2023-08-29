import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-100/20 dark:bg-slate-800 border border-slate-100/20", className)}
      {...props}
    />
  )
}

export { Skeleton }
