import StatusBadge from '@/components/ui/StatusBadge';
import type { Lead } from '@/types';

interface LeadCardProps {
  lead: Lead;
  selected: boolean;
  onClick: () => void;
}

const STATUS_BORDER: Record<string, string> = {
  Active: 'border-l-[3px] border-l-emerald-400',
  Lost: 'border-l-[3px] border-l-red-400',
  Pending: 'border-l-[3px] border-l-amber-400',
};

const STATUS_BG: Record<string, string> = {
  Active: 'from-emerald-50/60 to-white',
  Lost: 'from-red-50/40 to-white',
  Pending: 'from-amber-50/40 to-white',
};

export default function LeadCard({ lead, selected, onClick }: LeadCardProps) {
  const accentBorder = STATUS_BORDER[lead.status] ?? 'border-l-[3px] border-l-[var(--neo-border)]';
  const bgGradient = STATUS_BG[lead.status] ?? 'from-slate-50 to-white';

  return (
    <div
      className={`bg-gradient-to-r ${bgGradient} border rounded-xl cursor-pointer overflow-hidden transition-all duration-200 ${accentBorder}
        ${selected
          ? 'border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,.15),0_6px_20px_rgba(59,130,246,.14)]'
          : 'border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,.05)] hover:border-blue-300/70 hover:shadow-[0_6px_20px_rgba(59,130,246,.1)] hover:-translate-y-px'
        }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={selected}
    >
      <div className="flex items-center px-3 py-2.5 gap-3 w-full min-w-0">

        {/* Badge — fixed width on all screens */}
        <div className="shrink-0 min-w-0 sm:min-w-[160px]">
          <StatusBadge status={lead.status} />
        </div>

        {/* Name + BDR on same row */}
        <div className="flex items-center gap-3 min-w-0 flex-1">

          {/* Name column (fixed width) */}
          <span className="w-[160px] text-[13px] font-bold text-slate-800 leading-tight truncate tracking-[-0.2px]">
            {lead.name}
          </span>

          {/* BDR column */}
          <span className="text-[10.5px] text-slate-400 font-medium shrink-0">
            BDR: <span className="text-slate-600 font-semibold">{lead.bdr ?? '—'}</span>
          </span>

        </div>

        {/* Open — far right */}
        <a
          href="#"
          className="flex items-center gap-[4px] text-[10.5px] text-blue-500 font-semibold hover:text-blue-600 shrink-0 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Open
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>

      </div>
    </div>
  );
}