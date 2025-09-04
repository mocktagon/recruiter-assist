import { cn } from "@/lib/utils";

export type Status = 
  | "pending" 
  | "in-progress" 
  | "completed" 
  | "cancelled" 
  | "shortlisted"
  | "scheduled"
  | "under-review";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-status-pending-light text-status-pending border-status-pending/20"
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-status-in-progress-light text-status-in-progress border-status-in-progress/20"
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed-light text-status-completed border-status-completed/20"
  },
  cancelled: {
    label: "Cancelled", 
    className: "bg-status-cancelled-light text-status-cancelled border-status-cancelled/20"
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-success-light text-success border-success/20"
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-info-light text-info border-info/20"
  },
  "under-review": {
    label: "Under Review",
    className: "bg-warning-light text-warning border-warning/20"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  // Safety check for undefined config
  if (!config) {
    console.warn(`Invalid status passed to StatusBadge: "${status}"`);
    return (
      <span className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        "bg-muted text-foreground-muted border-border",
        className
      )}>
        Unknown
      </span>
    );
  }
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}