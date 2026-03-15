import StatusBadge from '@/components/ui/StatusBadge';
import ChannelBadge from '@/components/ui/ChannelBadge';
import type { Lead } from '@/types';

interface LeadCardHeaderProps {
  lead: Lead;
}

export default function LeadCardHeader({ lead }: LeadCardHeaderProps) {
  return (
    /*
     * .lc-h → flex items-center justify-between px-3 py-[7px]
     *         border-b border-[var(--neo-border)] bg-[var(--surface-2)]
     *         gap-2 flex-wrap
     */
    <div className="flex items-center justify-between px-3 py-[7px] border-b border-[var(--neo-border)] bg-[var(--surface-2)] gap-2 flex-wrap">

      {/* Left · .lc-hl → flex items-center gap-[7px] flex-wrap */}
      <div className="flex items-center gap-[7px] flex-wrap">
        <StatusBadge status={lead.status} />
        <ChannelBadge channel={lead.channel} />

        {/* .lc-dt → text-[10.5px] text-[var(--text-3)] */}
        <span className="text-[10.5px] text-[var(--text-3)]">{lead.date}</span>

        {/* .lc-age → text-[10px] text-[var(--text-3)] font-mono */}
        <span className="text-[10px] text-[var(--text-3)] font-mono">{lead.age}</span>

        {/* .lc-loc → flex items-center gap-[3px] text-[10.5px] text-[var(--text-2)] */}
        <span className="flex items-center gap-[3px] text-[10.5px] text-[var(--text-2)]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {lead.location}
        </span>
      </div>

      {/* Right · .lc-hr → flex items-center gap-[7px] flex-wrap */}
      <div className="flex items-center gap-[7px] flex-wrap">

        {lead.tags?.map((tag) => (
          /*
           * .tag-c → flex items-center gap-[3px] px-[7px] py-[2px]
           *          bg-orange-500/[.08] text-[var(--orange)]
           *          rounded-full text-[9.5px] font-semibold
           *          border border-orange-500/20
           */
          <span key={tag} className="flex items-center gap-[3px] px-[7px] py-[2px] bg-orange-500/[.08] text-[var(--orange)] rounded-full text-[9.5px] font-semibold border border-orange-500/20">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            {tag}
          </span>
        ))}

        {/* .stip → text-[10.5px] text-[#0891b2] font-medium hover:underline */}
        <a
          href="#"
          className="text-[10.5px] text-[#0891b2] font-medium hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Stips {lead.stips}
        </a>

        {/* .opl → flex items-center gap-[3px] text-[10.5px] text-[var(--neo-accent)] font-semibold hover:underline */}
        <a
          href="#"
          className="flex items-center gap-[3px] text-[10.5px] text-[var(--neo-accent)] font-semibold hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Open
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>

      </div>
    </div>
  );
}