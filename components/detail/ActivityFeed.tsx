import { ACTIVITY_FEED } from '@/data/mockData';
import type { ActivityType } from '@/types';
import React from 'react';

const ICON_CLS: Record<ActivityType, string> = {
  email:    'bg-blue-500/10 text-blue-600',
  followup: 'bg-orange-500/10 text-orange-500',
  status:   'bg-violet-500/10 text-violet-600',
  text:     'bg-cyan-500/10 text-cyan-600',
  esign:    'bg-emerald-500/10 text-emerald-600',
  note:     'bg-[var(--surface-3)] text-[var(--text-3)]',
};

function FeedIcon({ type }: { type: ActivityType }) {
  const icons: Record<ActivityType, React.ReactElement> = {
    email: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
    followup: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" /></svg>),
    status: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9,11 12,14 22,4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
    text: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
    esign: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
    note: (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
  };
  return icons[type];  
  
}

export default function ActivityFeed() {
  return (
    <div className="flex flex-col gap-[1px]">
      {ACTIVITY_FEED.map((item, i) => (
        <div key={i} className="flex items-start gap-[7px] px-[7px] py-[6px] rounded-[6px] border border-transparent transition-all duration-[120ms] hover:bg-[var(--surface-2)] hover:border-[var(--neo-border)]">
          <div className={`w-[21px] h-[21px] rounded-[4px] flex items-center justify-center shrink-0 ${ICON_CLS[item.type]}`}>
            <FeedIcon type={item.type} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold text-[var(--text-3)] uppercase tracking-[0.5px] block mb-[1px]">{item.kind}</span>
            <span className="text-[10.5px] text-[var(--text-2)] block overflow-hidden text-ellipsis whitespace-nowrap max-w-[210px]">{item.desc}</span>
          </div>
          <div className="flex flex-col items-end gap-[1px] shrink-0">
            <span className="text-[9.5px] text-[var(--text-2)] font-medium whitespace-nowrap">{item.actor}</span>
            <span className="text-[9px] text-[var(--text-3)] font-mono whitespace-nowrap">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}