'use client';

import { useState } from 'react';
import type { Lead } from '@/types';

interface DetailHeaderProps {
  lead: Lead;
  onClose: () => void;
  onUpdateLead: (updated: Lead) => void;
}

const STATUSES = ['Fresh', 'Active', 'Appointment Set', 'Rejected', 'Incomplete', 'Application Submitted', 'Lost'];

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[9px] font-bold uppercase tracking-[0.6px] text-slate-400 leading-none">{label}</span>
      <span className="text-[12px] font-semibold text-slate-700 mt-[3px] truncate">{value ?? '—'}</span>
    </div>
  );
}

export default function DetailHeader({ lead, onClose, onUpdateLead }: DetailHeaderProps) {
  const [status, setStatus] = useState(lead.status as string);
  const [saved, setSaved]   = useState(false);
  const [firstName, ...rest] = lead.name.split(' ');
  const lastName = rest.join(' ');

  function handleSave() {
    onUpdateLead({ ...lead, status: status as Lead['status'] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 gap-2 flex-wrap rounded-t-lg" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }}>
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setSaved(false); }}
            className="appearance-none bg-white/20 border border-white/30 text-white text-[9.5px] font-bold uppercase tracking-[0.5px] px-3 py-[4px] pr-7 rounded-full cursor-pointer outline-none hover:bg-white/30 transition-colors max-w-[200px]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' fill='none' viewBox='0 0 8 5'%3E%3Cpath d='M1 1l3 3 3-3' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            {STATUSES.map((s) => <option key={s} value={s} className="text-slate-800 font-medium normal-case tracking-normal">{s}</option>)}
          </select>
          {!saved && (
            <button onClick={handleSave} className="px-3 py-[3px] bg-white text-blue-600 text-[9.5px] font-bold rounded-full hover:bg-blue-50 transition-all">
              Save
            </button>
          )}
          {saved && (
            <span className="flex items-center gap-1 text-[9.5px] text-white/80">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Saved
            </span>
          )}
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Name block */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <h2 className="text-[18px] font-extrabold text-slate-800 tracking-[-0.4px] leading-tight">{lead.name}</h2>
        {lead.phone && <a href={`tel:${lead.phone}`} className="text-[12.5px] text-blue-500 font-semibold mt-0.5 block hover:underline">{lead.phone}</a>}
        {lead.email && <a href={`mailto:${lead.email}`} className="text-[11.5px] text-slate-400 hover:text-blue-500 transition-colors mt-0.5 block truncate">{lead.email}</a>}
      </div>

      {/* Fields grid */}
      <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-3 border-b border-slate-100 bg-slate-50/50">
        <Field label="First Name"      value={firstName} />
        <Field label="Last Name"       value={lastName || null} />
        <Field label="Email"           value={lead.email} />
        <Field label="Cell Phone"      value={lead.phone} />
        <Field label="Lot"             value={lead.lot} />
        <Field label="BDR"             value={lead.bdr} />
        <Field label="Referral Source" value={lead.source} />
        <Field label="UTM Term"        value={lead.utmTerm} />
        <Field label="UTM Medium"      value={lead.utmMedium} />
        <Field label="Sales Person"    value={lead.sales} />
      </div>
    </div>
  );
}