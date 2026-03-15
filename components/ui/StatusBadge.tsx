interface StatusBadgeProps {
  status: string;
}

const STYLES: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  Active:                 { bg: 'bg-emerald-50',  text: 'text-emerald-700', ring: 'ring-emerald-200', dot: 'bg-emerald-400' },
  Lost:                   { bg: 'bg-red-50',      text: 'text-red-600',     ring: 'ring-red-200',     dot: 'bg-red-400'     },
  Pending:                { bg: 'bg-amber-50',    text: 'text-amber-700',   ring: 'ring-amber-200',   dot: 'bg-amber-400'   },
  Fresh:                  { bg: 'bg-blue-50',     text: 'text-blue-600',    ring: 'ring-blue-200',    dot: 'bg-blue-400'    },
  'Appointment Set':      { bg: 'bg-violet-50',   text: 'text-violet-600',  ring: 'ring-violet-200',  dot: 'bg-violet-400'  },
  Rejected:               { bg: 'bg-rose-50',     text: 'text-rose-600',    ring: 'ring-rose-200',    dot: 'bg-rose-400'    },
  Incomplete:             { bg: 'bg-orange-50',   text: 'text-orange-600',  ring: 'ring-orange-200',  dot: 'bg-orange-400'  },
  'Application Submitted':{ bg: 'bg-indigo-50',   text: 'text-indigo-600',  ring: 'ring-indigo-200',  dot: 'bg-indigo-400'  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = STYLES[status] ?? STYLES.Active;
  return (
    <span className={`inline-flex items-center gap-[5px] px-[8px] py-[3px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] ring-1 whitespace-nowrap ${s.bg} ${s.text} ${s.ring}`}>
      <span className={`w-[5px] h-[5px] rounded-full shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}