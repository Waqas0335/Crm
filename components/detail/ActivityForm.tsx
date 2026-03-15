'use client';

import { useState } from 'react';
import ActivityFeed from './ActivityFeed';
import SendMessageForm from './SendMessageForm';
import type { ActivityTab, NoteType, ActivityFilters, ActivityItem } from '@/types';

const ACTIVITY_TABS: ActivityTab[] = ['Make note', 'Create event', 'Send text/email'];
const NOTE_TYPES: NoteType[] = ['Verification note', 'Sales note'];
const FILTER_KEYS = ['text', 'notes', 'events', 'activity'] as const;

const INPUT_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-[6px] rounded-[6px] w-full shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]';
const SELECT_CLS = INPUT_CLS + ' appearance-none cursor-pointer pr-[22px] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_7px_center]';
const TEXTAREA_CLS = 'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] px-[9px] py-[7px] rounded-[6px] w-full resize-y min-h-[70px] shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] placeholder:text-[var(--text-3)]';
const LABEL_CLS = 'text-[10px] text-[var(--text-3)] font-medium';
const MK_BTN = 'px-[16px] py-[7px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white text-[11.5px] font-bold rounded-[6px] shadow-[0_2px_8px_rgba(37,99,235,.3)] tracking-[0.3px] transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[.98]';

type ActivityType = 'email' | 'followup' | 'status' | 'text' | 'esign' | 'note';

const TYPE_ICON: Record<ActivityType, string> = { note: '📝', email: '✉️', text: '💬', followup: '📅', status: '🔄', esign: '✍️' };
const TYPE_COLOR: Record<ActivityType, string> = { note: 'bg-slate-100 text-slate-500', email: 'bg-blue-50 text-blue-500', text: 'bg-cyan-50 text-cyan-600', followup: 'bg-orange-50 text-orange-500', status: 'bg-violet-50 text-violet-500', esign: 'bg-emerald-50 text-emerald-500' };

export default function ActivityForm() {
  const [activeTab, setActiveTab]   = useState<ActivityTab>('Make note');
  const [noteType, setNoteType]     = useState<NoteType>('Verification note');
  const [noteText, setNoteText]     = useState('');
  const [eventType, setEventType]   = useState('');
  const [eventDate, setEventDate]   = useState('');
  const [eventTime, setEventTime]   = useState('');
  const [localNotes, setLocalNotes] = useState<ActivityItem[]>([]);
  const [filters, setFilters]       = useState<ActivityFilters>({ text: true, notes: true, events: true, activity: true });

  function toggleFilter(key: keyof ActivityFilters) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleMakeNote() {
    if (!noteText.trim()) return;
    const now = new Date();
    const time = now.toLocaleString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const newNote: ActivityItem = { type: 'note', kind: noteType, desc: noteText.trim(), actor: 'You', time };
    setLocalNotes((prev) => [newNote, ...prev]);
    setNoteText('');
  }

  return (
    <div className="p-3">
      {/* Tabs */}
      <div className="flex gap-[3px] flex-wrap mb-3">
        {ACTIVITY_TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-[11px] py-[5px] text-[10.5px] font-semibold rounded-[6px] border transition-all duration-150 cursor-pointer
              ${activeTab === tab ? 'bg-[var(--accent-g)] border-[var(--neo-accent)] text-[var(--neo-accent)]' : 'bg-white border-[var(--neo-border)] text-[var(--text-2)] shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)]'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Make note' && (
        <div className="flex flex-col gap-[9px] mb-3">
          <div className="flex flex-col gap-[3px]">
            <label className={LABEL_CLS}>Note type</label>
            <select className={SELECT_CLS} value={noteType} onChange={(e) => setNoteType(e.target.value as NoteType)}>
              {NOTE_TYPES.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-[3px]">
            <label className={LABEL_CLS}>Note</label>
            <textarea className={TEXTAREA_CLS} placeholder="Type your note here..." value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={3} />
          </div>
          <button className={MK_BTN} onClick={handleMakeNote}>Make Note</button>
        </div>
      )}

      {activeTab === 'Create event' && (
        <div className="flex flex-col gap-[9px] mb-3">
          <div className="flex flex-col gap-[3px]">
            <label className={LABEL_CLS}>Type</label>
            <select className={SELECT_CLS} value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="">Select type...</option>
              <optgroup label="Already Completed!">
                <option value="Walk-In">Walk-In</option>
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
            <label className={LABEL_CLS}>Date</label>
            <input type="date" className={INPUT_CLS} value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-[3px]">
            <label className={LABEL_CLS}>Time</label>
            <input type="time" className={INPUT_CLS} value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
          </div>
          <button className={MK_BTN}>Create Event</button>
        </div>
      )}

      {activeTab === 'Send text/email' && <SendMessageForm />}

      <div className="flex items-center gap-[7px] py-[7px] border-b border-[var(--neo-border)] mb-[9px] flex-wrap">
        {FILTER_KEYS.map((key) => (
          <label key={key} className="flex items-center gap-[3px] cursor-pointer text-[10.5px] text-[var(--text-2)]">
            <input type="checkbox" className="w-3 h-3 accent-[var(--neo-accent)]" checked={filters[key]} onChange={() => toggleFilter(key)} />
            <span className="capitalize">{key}</span>
            <span className="text-[var(--text-3)] italic text-[9.5px]">only</span>
          </label>
        ))}
        <button className="ml-auto px-[7px] py-[2px] text-[10.5px] bg-white border border-[var(--neo-border)] rounded-[5px] text-[var(--text-2)] transition-all hover:border-[var(--neo-accent)] hover:text-[var(--neo-accent)]">
          Show all
        </button>
      </div>

      {localNotes.length > 0 && (
        <div className="flex flex-col gap-1 mb-2">
          {localNotes.map((note, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-2.5 rounded-xl border border-slate-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,.05)]">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] shrink-0 ${TYPE_COLOR[note.type as ActivityType]}`}>
                {TYPE_ICON[note.type as ActivityType]}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-slate-400">{note.kind}</span>
                <span className="text-[11.5px] text-slate-700 mt-[2px] break-words">{note.desc}</span>
              </div>
              <div className="flex flex-col items-end shrink-0 gap-0.5">
                <span className="text-[9.5px] font-semibold text-slate-500">{note.actor}</span>
                <span className="text-[9px] text-slate-400 font-mono">{note.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ActivityFeed />
    </div>
  );
}