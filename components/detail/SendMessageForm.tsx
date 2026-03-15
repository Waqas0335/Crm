'use client'

import { useState } from 'react'

const SELECT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-1.5 pr-[22px] rounded-[6px] w-full appearance-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_7px_center]'
const INPUT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-1.5 rounded-[6px] w-full shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]'
const TEXTAREA_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-[7px] rounded-[6px] w-full resize-y min-h-[70px] shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]'
const LABEL_CLS = 'text-[10px] text-[var(--text-3)] font-medium'
const MK_BTN = 'px-[16px] py-[7px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white text-[11.5px] font-bold rounded-[6px] shadow-[0_2px_8px_rgba(37,99,235,.3)] tracking-[0.3px] transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100'

export default function SendMessageForm() {
  const [stopReceiving, setStopReceiving] = useState(false)
  const [recipient, setRecipient]         = useState('Applicant')
  const [sendBy, setSendBy]               = useState('Email')
  const [schedule, setSchedule]           = useState('')
  const [template, setTemplate]           = useState('None')
  const [message, setMessage]             = useState('')
  const [file, setFile]                   = useState<File | null>(null)

  return (
    <div className="flex flex-col gap-[9px]">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-3 h-3 accent-[var(--neo-accent)]" checked={stopReceiving} onChange={() => setStopReceiving(!stopReceiving)} />
        <span className="text-[11.5px] font-bold text-[var(--text-1)]">Stop Receiving Text</span>
      </label>
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Send to</label>
        <select className={SELECT_CLS} value={recipient} onChange={(e) => setRecipient(e.target.value)}>
          <option value="Applicant">Applicant</option>
        </select>
      </div>
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Send by</label>
        <select className={SELECT_CLS} value={sendBy} onChange={(e) => setSendBy(e.target.value)}>
          <option value="Email">Email</option>
          <option value="Text">Text</option>
        </select>
      </div>
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Schedule for?</label>
        <input className={INPUT_CLS} placeholder="Select date/time" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
      </div>
      {sendBy === 'Email' && (
        <div className="flex flex-col gap-[3px]">
          <label className={LABEL_CLS}>Email Subject</label>
          <input className={INPUT_CLS} placeholder="Subject" />
        </div>
      )}
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Templates</label>
        <select className={SELECT_CLS} value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="None">None</option>
        </select>
      </div>
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Message</label>
        <textarea className={TEXTAREA_CLS} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
      </div>
      <div className="flex flex-col gap-[3px]">
        <label className={LABEL_CLS}>Attach file</label>
        <input type="file" className="text-[11px] text-[var(--text-2)] file:mr-2 file:py-1 file:px-3 file:rounded-[5px] file:border file:border-[var(--neo-border)] file:text-[10.5px] file:font-medium file:bg-white file:text-[var(--text-2)] file:cursor-pointer hover:file:bg-[var(--surface-2)] w-full" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <button className={MK_BTN} disabled={!message} onClick={() => { setMessage(''); setFile(null) }}>
        Send message
      </button>
    </div>
  )
}