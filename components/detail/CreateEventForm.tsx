'use client';

import { useState } from 'react';

/* Matches .nf-sel from the CRM design system */
const SELECT_CLS =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] px-[9px] py-[6px] pr-[22px] rounded-[6px] w-full appearance-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_7px_center]';

/* Matches .nf-in */
const INPUT_CLS =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] px-[9px] py-[6px] rounded-[6px] w-full shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]';

/* Matches .nf-ta */
const TEXTAREA_CLS =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] px-[9px] py-[7px] rounded-[6px] w-full resize-y min-h-[70px] shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]';

/* Matches .nf-f label */
const LABEL_CLS = 'text-[10px] text-[var(--text-3)] font-medium';

/* Matches .mk-btn */
const MK_BTN =
  'px-[16px] py-[7px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white text-[11.5px] font-bold font-[family-name:var(--fd)] rounded-[6px] shadow-[0_2px_8px_rgba(37,99,235,.3)] tracking-[0.3px] transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[.98]';

export default function CreateEventForm() {
  const [eventType, setEventType]       = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [callStatus, setCallStatus]     = useState('');
  const [visitStatus, setVisitStatus]   = useState('');
  const [promiseStatus, setPromiseStatus] = useState('');
  const [eventNote, setEventNote]       = useState('');

  return (
    /*
     * Replaces Bootstrap .form → matches .nf (flex flex-col gap-[9px]) wrapper
     * w-full, responsive padding
     */
    <form
      className="flex flex-col gap-[9px] w-full"
      method="post"
      action="/event/update?action_plan=false&neo_id=eSlUOzTPEKZyO5eIQ57piw3BG&owner_class=ModelApplication"
      autoComplete="off"
    >
      {/* .form-group → .nf-f (flex flex-col gap-[3px]) */}
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Type</label>
        <select className={SELECT_CLS} value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">Select type</option>
          <optgroup label="Already Completed!">
            <option value="Visited Store">Walk-In</option>
            <option value="Received Call">Received Call</option>
            <option value="Placed Call">Placed Call</option>
            <option value="Sent Email">Sent Email</option>
          </optgroup>
          <optgroup label="Schedule For Future">
            <option value="Follow Up">Follow Up</option>
            <option value="Appointment">Appointment</option>
          </optgroup>
        </select>
      </div>

      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Schedule for?</label>
        <input className={INPUT_CLS} type="text" placeholder="Select date & time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
      </div>

      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Call Outcome</label>
        <select className={SELECT_CLS} value={callStatus} onChange={(e) => setCallStatus(e.target.value)}>
          <option value="">Select call outcome</option>
          <option value="Busy">Busy</option>
          <option value="Call Rejected">Call Rejected</option>
          <option value="Disconnected">Disconnected</option>
          <option value="Left VM">Left VM</option>
          <option value="No Answer">No Answer</option>
          <option value="Spoke with Customer">Spoke with Customer</option>
        </select>
      </div>

      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Visit Outcome</label>
        <select className={SELECT_CLS} value={visitStatus} onChange={(e) => setVisitStatus(e.target.value)}>
          <option value="">Select visit outcome</option>
          <option value="Application Submitted">Application Submitted</option>
          <option value="Didn't Like Selection">Didn&apos;t Like Selection</option>
          <option value="Not Ready">Not Ready</option>
          <option value="Showed">Showed</option>
        </select>
      </div>

      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Promise Outcome</label>
        <select className={SELECT_CLS} value={promiseStatus} onChange={(e) => setPromiseStatus(e.target.value)}>
          <option value="">Select promise outcome</option>
          <option value="Cleared">Cleared</option>
          <option value="Not Cleared">Not Cleared</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Event note</label>
        <textarea className={TEXTAREA_CLS} rows={5} value={eventNote} onChange={(e) => setEventNote(e.target.value)} placeholder="Add any notes for this event..." />
      </div>

      {/* .btn.btn-primary → .mk-btn */}
      <button type="submit" className={MK_BTN}>Create Event</button>
    </form>
  );
}