'use client';

import { useState } from 'react';

const SELECT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[10.5px] px-[6px] py-1 pr-[18px] rounded-[5px] appearance-none cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,.05)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] min-w-[75px] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'5\' fill=\'none\' viewBox=\'0 0 8 5\'%3E%3Cpath d=\'M1 1l3 3 3-3\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_5px_center]';
const INPUT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11px] px-[7px] py-[5px] rounded-[5px] w-full shadow-[0_1px_2px_rgba(0,0,0,.05)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]';
const LABEL_CLS = 'text-[9.5px] text-[var(--text-3)] font-medium uppercase tracking-[0.5px]';
const VALUE_CLS = 'text-[11.5px] text-[var(--text-2)]';

export default function DetailFields() {
  const [tags, setTags] = useState('');
  return (
    <div className="flex flex-col gap-[7px] px-3 pb-[10px] border-b border-[var(--neo-border)]">
      <div className="flex gap-[9px] flex-wrap items-end">
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Sales</label><select className={SELECT_CLS}><option>—</option></select></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Decision</label><select className={SELECT_CLS}><option>—</option></select></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Source</label><span className="bg-blue-500/10 text-blue-700 px-2 py-[3px] rounded-full text-[10.5px] font-semibold">Facebook</span></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Detail</label><span className={VALUE_CLS}>—</span></div>
      </div>
      <div className="flex gap-[9px] flex-wrap items-end">
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Sales 2</label><select className={SELECT_CLS}><option>—</option></select></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Lot</label><select className={SELECT_CLS}><option>Arizona- Pri</option></select></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>Tiers</label><span className={VALUE_CLS}>—</span></div>
      </div>
      <div className="flex gap-[9px] flex-wrap items-end">
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>BDR</label><select className={SELECT_CLS}><option>Natalia L</option></select></div>
        <div className="flex flex-col gap-[2px] min-w-0"><label className={LABEL_CLS}>BDR 2</label><select className={SELECT_CLS}><option>—</option></select></div>
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <label className={LABEL_CLS}>Tags</label>
        <input className={INPUT_CLS} placeholder="Add tag..." value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
    </div>
  );
}