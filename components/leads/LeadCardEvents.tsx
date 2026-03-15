import type { LeadEvent } from '@/types';

interface LeadCardEventsProps {
  events: LeadEvent[];
}

function EventIcon({ type }: { type: LeadEvent['type'] }) {
  if (type === 'followup') {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  }
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function LeadCardEvents({ events }: LeadCardEventsProps) {
  const followupEvent = events.find((ev) => ev.type === 'followup');
  if (!followupEvent) return null;

  return (
    /*
     * .la-col → w-[320px] shrink-0 pl-[11px] flex flex-col gap-[3px]
     * Responsive: hidden on mobile (<600px)
     */
    <div className="hidden sm:flex w-[320px] shrink-0 pl-[11px] flex-col gap-[3px]">

      {/*
       * .er.fu → flex items-start gap-[6px] px-[7px] py-1 rounded-[6px]
       *          border border-transparent transition-all duration-[120ms]
       *          hover:bg-[var(--surface-2)] hover:border-[var(--neo-border)]
       *          w-full h-full
       */}
      <div className="flex items-start gap-[6px] px-[7px] py-1 rounded-[6px] border border-transparent transition-all duration-[120ms] hover:bg-[var(--surface-2)] hover:border-[var(--neo-border)] w-full">

        {/*
         * .ei (fu) → w-[19px] h-[19px] flex items-center justify-center
         *            rounded-[4px] shrink-0 mt-[1px]
         *            bg-orange-500/10 text-[var(--orange)]
         */}
        <div className="w-[19px] h-[19px] flex items-center justify-center rounded-[4px] shrink-0 mt-[1px] bg-orange-500/10 text-[var(--orange)]">
          <EventIcon type={followupEvent.type} />
        </div>

        {/* .ec → flex-1 min-w-0 */}
        <div className="flex-1 min-w-0">
          {/* .ek → text-[9px] font-bold text-[var(--text-3)] uppercase tracking-[0.5px] block leading-none mb-[1px] */}
          <span className="text-[9px] font-bold text-[var(--text-3)] uppercase tracking-[0.5px] block leading-none mb-[1px]">
            {followupEvent.kind}
          </span>
          {/* .ed → text-[10.5px] text-[var(--text-2)] block whitespace-nowrap overflow-hidden text-ellipsis */}
          <span className="text-[10.5px] text-[var(--text-2)] block whitespace-nowrap overflow-hidden text-ellipsis">
            {followupEvent.desc}
          </span>
        </div>

        {/* .em → flex flex-col items-end gap-[1px] shrink-0 */}
        <div className="flex flex-col items-end gap-[1px] shrink-0">
          {/* .es → text-[9.5px] text-[var(--text-3)] whitespace-nowrap */}
          <span className="text-[9.5px] text-[var(--text-3)] whitespace-nowrap">{followupEvent.sender}</span>
          {/* .et → text-[9px] text-[var(--text-3)] font-mono whitespace-nowrap */}
          <span className="text-[9px] text-[var(--text-3)] font-mono whitespace-nowrap">{followupEvent.time}</span>
        </div>

      </div>
    </div>
  );
}