interface ProblemNumberIconProps {
  children: React.ReactNode
}

export function ProblemNumberIcon({ children }: ProblemNumberIconProps) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
      {children}
    </div>
  )
}
