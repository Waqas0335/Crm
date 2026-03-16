'use client'

import { useState } from 'react'

const SELECT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-1.5 pr-[22px] rounded-[6px] w-full appearance-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_7px_center]'
const INPUT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-1.5 rounded-[6px] w-full shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]'
const INPUT_ERR_CLS = 'bg-white border border-red-400 text-[var(--text-1)] text-[11.5px] px-[9px] py-1.5 rounded-[6px] w-full shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,.15)] placeholder:text-[var(--text-3)]'
const TEXTAREA_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-[7px] rounded-[6px] w-full resize-y min-h-[70px] shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]'
const LABEL_CLS = 'text-[10px] text-[var(--text-3)] font-semibold uppercase tracking-[0.5px]'
const MK_BTN = 'px-[16px] py-[7px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white text-[11.5px] font-bold rounded-[6px] shadow-[0_2px_8px_rgba(37,99,235,.3)] tracking-[0.3px] transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function SendMessageForm() {
  const [stopReceiving, setStopReceiving] = useState(false)
  const [recipient, setRecipient]         = useState('Applicant')
  const [sendBy, setSendBy]               = useState('Email')
  const [emailAddress, setEmailAddress]   = useState('')
  const [emailTouched, setEmailTouched]   = useState(false)
  const [schedule, setSchedule]           = useState('')
  const [template, setTemplate]           = useState('None')
  const [message, setMessage]             = useState('')
  const [file, setFile]                   = useState<File | null>(null)

  const emailError = emailTouched && emailAddress.length > 0 && !isValidEmail(emailAddress)
  const emailEmpty = emailTouched && emailAddress.length === 0

  const canSend = message.trim().length > 0 && (sendBy !== 'Email' || isValidEmail(emailAddress))

  function handleSend() {
    if (sendBy === 'Email' && !isValidEmail(emailAddress)) {
      setEmailTouched(true)
      return
    }
    setMessage('')
    setFile(null)
    setEmailAddress('')
    setEmailTouched(false)
  }

  return (
    <div className="flex flex-col gap-[9px]">

      {/* Stop Receiving Text */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-3 h-3 accent-[var(--neo-accent)]"
          checked={stopReceiving}
          onChange={() => setStopReceiving(!stopReceiving)}
        />
        <span className="text-[11.5px] font-bold text-[var(--text-1)]">Stop Receiving Text</span>
      </label>

      {/* Send to */}
      <div className="flex flex-col gap-[4px]">
        <label className={LABEL_CLS}>Send to</label>
        <select className={SELECT_CLS} value={recipient} onChange={(e) => setRecipient(e.target.value)}>
          <option value="Applicant">Applicant</option>
        </select>
      </div>

      {/* Send by */}
      <div className="flex flex-col gap-[4px]">
        <label className={LABEL_CLS}>Send by</label>
        <select
          className={SELECT_CLS}
          value={sendBy}
          onChange={(e) => {
            setSendBy(e.target.value)
            setEmailTouched(false)
          }}
        >
          <option value="Email">Email</option>
          <option value="Text">Text</option>
        </select>
      </div>

      {/* Email Address — only shown when Send by = Email */}
      {sendBy === 'Email' && (
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center justify-between">
            <label className={LABEL_CLS}>Email Address</label>
            {emailError && (
              <span className="flex items-center gap-1 text-[9.5px] font-semibold text-red-500">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Invalid email address
              </span>
            )}
            {emailEmpty && (
              <span className="flex items-center gap-1 text-[9.5px] font-semibold text-red-500">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Email is required
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              className={`${emailError || emailEmpty ? INPUT_ERR_CLS : INPUT_CLS} pr-8`}
              placeholder="example@email.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              {emailTouched && isValidEmail(emailAddress) && (
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {(emailError || emailEmpty) && (
                <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          {emailError && (
            <p className="text-[10px] text-red-400 mt-[-2px]">Please enter a valid email like name@domain.com</p>
          )}
        </div>
      )}

      {/* Schedule for */}
      <div className="flex flex-col gap-[4px]">
        <label className={LABEL_CLS}>Schedule for?</label>
        <input className={INPUT_CLS} placeholder="Select date/time" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
      </div>

      {/* Email Subject */}
      {sendBy === 'Email' && (
        <div className="flex flex-col gap-[4px]">
          <label className={LABEL_CLS}>Email Subject</label>
          <input className={INPUT_CLS} placeholder="Subject" />
        </div>
      )}

      {/* Templates */}
      <div className="flex flex-col gap-[4px]">
        <label className={LABEL_CLS}>Templates</label>
        <select className={SELECT_CLS} value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="None">None</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center justify-between">
          <label className={LABEL_CLS}>Message</label>
          {message.length > 0 && (
            <span className="text-[9.5px] text-[var(--text-3)] font-mono tabular-nums">{message.length} chars</span>
          )}
        </div>
        <textarea
          className={TEXTAREA_CLS}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
      </div>

      {/* Attach file */}
      <div className="flex flex-col gap-[4px]">
        <label className={LABEL_CLS}>Attach file</label>
        {file ? (
          <div className="flex items-center gap-2 px-3 py-[7px] rounded-[6px] border border-[var(--neo-accent)] bg-[var(--accent-g)] shadow-[0_1px_3px_rgba(0,0,0,.06)]">
            <svg className="w-3 h-3 text-[var(--neo-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-[11px] text-[var(--neo-accent)] font-medium truncate flex-1">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-[var(--neo-accent)] hover:text-red-500 transition-colors cursor-pointer">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-3 py-[7px] rounded-[6px] border border-dashed border-[var(--neo-border)] bg-white text-[var(--text-3)] hover:border-[var(--neo-accent)] hover:text-[var(--neo-accent)] hover:bg-[var(--accent-g)] cursor-pointer transition-all">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-[11px] font-medium">Click to attach a file</span>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        )}
      </div>

      {/* Send Button */}
      <button className={MK_BTN} disabled={!canSend} onClick={handleSend}>
        Send message
      </button>

    </div>
  )
}