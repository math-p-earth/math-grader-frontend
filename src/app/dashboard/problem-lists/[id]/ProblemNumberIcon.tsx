interface ProblemNumberIconProps {
  children: React.ReactNode
}

export function ProblemNumberIcon({ children }: ProblemNumberIconProps) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
      {children}
    </div>
  )
}
