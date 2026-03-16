'use client';

import { useState } from 'react';
import type { Lead } from '@/types';
import PhoneInput from '@/components/ui/PhoneInput';

interface AddLeadModalProps {
  onClose: () => void;
  onAdd: (lead: Lead) => void;
}

const STATUSES = ['Fresh', 'Active', 'Appointment Set', 'Rejected', 'Incomplete', 'Application Submitted', 'Lost'];
const LOTS     = ['Mesa', 'Phoenix', 'Flagstaff', 'Tucson'];
const SOURCES  = ['Facebook', 'Google', 'Referral', 'Walk In', 'Phone'];

const STATUS_COLOR: Record<string, string> = {
  Fresh:                  'text-blue-600   bg-blue-50   border-blue-200',
  Active:                 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Appointment Set':      'text-violet-600 bg-violet-50 border-violet-200',
  Rejected:               'text-red-600    bg-red-50    border-red-200',
  Incomplete:             'text-amber-600  bg-amber-50  border-amber-200',
  'Application Submitted':'text-indigo-600 bg-indigo-50 border-indigo-200',
  Lost:                   'text-rose-600   bg-rose-50   border-rose-200',
};

const inp = `w-full bg-white/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[12.5px] text-slate-700
  focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100/70
  transition-all placeholder:text-slate-300 hover:border-slate-300`;

const lbl = `block text-[9.5px] font-bold uppercase tracking-[0.7px] text-slate-400 mb-1.5`;

export default function AddLeadModal({ onClose, onAdd }: AddLeadModalProps) {
  const [form, setForm] = useState({
    status:    'Fresh',
    firstName: '',
    lastName:  '',
    email:     '',
    phone:     '',
    lot:       'Mesa',
    bdr:       '',
    source:    'Facebook',
    utmTerm:   'Manual',
    utmMedium: 'Manual',
    sales:     '',
  });
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const showEmailErr = emailTouched && form.email.length > 0 && !emailValid;

  function set(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function handleSubmit() {
    if (!form.firstName.trim() && !form.lastName.trim()) return;
    const newLead: Lead = {
      id:       Date.now(),
      status:   (['Active', 'Lost', 'Pending'].includes(form.status) ? form.status : 'Active') as Lead['status'],
      channel:  'Lead',
      date:     new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
      age:      '0d',
      location: form.lot,
      name:     `${form.firstName} ${form.lastName}`.trim(),
      phone:    form.phone,
      source:   form.source,
      bdr:      form.bdr || null,
      lot:      form.lot,
      down:     null,
      stips:    0,
    };
    onAdd(newLead);
    onClose();
  }

  return (
    <>
      {/* Backdrop — click outside closes */}
      <div
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-lg max-h-[92vh] rounded-2xl flex flex-col overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f5f7ff 100%)', boxShadow: '0 32px 80px rgba(37,99,235,0.18), 0 8px 32px rgba(0,0,0,0.1)' }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-6 py-5 rounded-t-2xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div>
                <h2 className="text-[16px] font-extrabold text-white tracking-[-0.3px] leading-tight">
                  Add New Lead
                </h2>
                <p className="text-[11px] text-white/65 mt-0.5">Fill in the details to create a lead</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">

            {/* Status — visual pill selector */}
            <div>
              <label className={lbl}>Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => set('status', s)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                      form.status === s
                        ? `${STATUS_COLOR[s]} shadow-sm scale-[1.03]`
                        : 'text-slate-400 bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>First Name</label>
                <input className={inp} placeholder="John" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Last Name</label>
                <input className={inp} placeholder="Doe" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Email</label>
                <input
                  className={`${inp} ${showEmailErr ? '!border-red-300' : ''}`}
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
                {showEmailErr && (
                  <p className="text-[10.5px] text-red-500 font-medium mt-1">Invalid email address</p>
                )}
              </div>
              <div>
                <label className={lbl}>Cell Phone</label>
                <PhoneInput
                  value={form.phone}
                  onChange={(val) => set('phone', val)}
                  inputClassName={inp}
                />
              </div>
            </div>

            {/* Lot + BDR */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Lot</label>
                <select className={inp} value={form.lot} onChange={(e) => set('lot', e.target.value)}>
                  {LOTS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>
                  BDR
                  <span className="ml-1.5 normal-case tracking-normal font-normal text-slate-300 text-[9px]">(auto-assigned)</span>
                </label>
                <input
                  className={`${inp} bg-slate-50 text-slate-300 cursor-not-allowed`}
                  placeholder="Auto"
                  value={form.bdr}
                  readOnly
                />
              </div>
            </div>

            {/* Referral Source */}
            <div>
              <label className={lbl}>Referral Source</label>
              <select className={inp} value={form.source} onChange={(e) => set('source', e.target.value)}>
                {SOURCES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* UTM row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>UTM Term</label>
                <input className={inp} value={form.utmTerm} onChange={(e) => set('utmTerm', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>UTM Medium</label>
                <input className={inp} value={form.utmMedium} onChange={(e) => set('utmMedium', e.target.value)} />
              </div>
            </div>

            {/* Sales Person */}
            <div>
              <label className={lbl}>Sales Person</label>
              <input className={inp} placeholder="Leave blank" value={form.sales} onChange={(e) => set('sales', e.target.value)} />
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white/60 rounded-b-2xl shrink-0">
            <p className="text-[10.5px] text-slate-400">
              <span className="text-red-400 font-bold">*</span> First or last name required
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2 text-[12px] font-bold text-white rounded-xl transition-all hover:opacity-90 hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] active:scale-[.98]"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Lead
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}