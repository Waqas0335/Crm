import type { Lead } from '@/types';

interface LeadCardProps {
  lead: Lead;
  selected: boolean;
  onClick: () => void;
}

const STATUS_STYLE: Record<string, { text: string; border: string }> = {
  Active:                  { text: 'text-emerald-600', border: 'border-emerald-300' },
  Lost:                    { text: 'text-red-500',     border: 'border-red-300'     },
  Pending:                 { text: 'text-amber-500',   border: 'border-amber-300'   },
  Fresh:                   { text: 'text-blue-500',    border: 'border-blue-300'    },
  'Appointment Set':       { text: 'text-violet-600',  border: 'border-violet-300'  },
  Rejected:                { text: 'text-rose-500',    border: 'border-rose-300'    },
  Incomplete:              { text: 'text-orange-500',  border: 'border-orange-300'  },
  'Application Submitted': { text: 'text-indigo-600',  border: 'border-indigo-300'  },
};

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const ini = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0].slice(0, 2);
  return (
    <div
      className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-[12px] font-bold text-white"
      style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
    >
      {ini.toUpperCase()}
    </div>
  );
}

export default function LeadCard({ lead, selected, onClick }: LeadCardProps) {
  const st = STATUS_STYLE[lead.status] ?? { text: 'text-slate-500', border: 'border-slate-300' };

  return (
    <div
      className={`flex items-center px-4 py-3 w-full cursor-pointer transition-all duration-150 border-b border-slate-100
        ${selected
          ? 'bg-blue-50 border-l-[3px] border-l-blue-500'
          : 'bg-white hover:bg-slate-50/80 border-l-[3px] border-l-transparent'
        }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={selected}
    >
      {/* Avatar */}
      <div className="w-[48px] shrink-0">
        <Initials name={lead.name} />
      </div>

      {/* Name — fixed width */}
      <div className="w-[180px] shrink-0 min-w-0 pr-2">
        <span className="text-[13px] font-semibold text-slate-800 truncate block leading-tight">{lead.name}</span>
      </div>

      {/* BDR — fixed width */}
      <div className="w-[130px] shrink-0 pr-2">
        <span className="text-[11.5px] text-slate-400">
          BDR: <span className="text-slate-600 font-medium">{lead.bdr ?? '—'}</span>
        </span>
      </div>

      {/* Status — bordered pill, text color only, no bg */}
      <div className="flex-1 min-w-0">
        <span className={`inline-block text-[11px] font-semibold px-2.5 py-[3px] rounded-full border ${st.text} ${st.border} bg-transparent whitespace-nowrap`}>
          {lead.status}
        </span>
      </div>

      {/* Open */}
      <div className="w-[70px] shrink-0 flex justify-end">
        <a
          href="#"
          className="flex items-center gap-[4px] text-[10.5px] text-blue-500 font-semibold hover:text-blue-600 shrink-0 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
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