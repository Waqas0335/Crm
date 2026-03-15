'use client'
import { useState } from 'react'
import type { EventsTab } from '@/types'

const TABS: { label: EventsTab; count: number }[] = [
  { label: 'Today Events', count: 0 },
  { label: 'All Scheduled Events', count: 1 },
  { label: 'Action Plans', count: 2 },
]

export default function EventsTabs() {
  const [activeTab, setActiveTab] = useState<EventsTab>('Today Events')
  return (
    <div className="flex flex-col">
      <div className="flex border-b border-[var(--neo-border)] overflow-x-auto">
        {TABS.map(({ label, count }) => (
          <button key={label} onClick={() => setActiveTab(label)}
            className={`px-3 py-2 text-[10.5px] font-semibold whitespace-nowrap border-b-2 transition-all duration-150 cursor-pointer bg-transparent
              ${activeTab === label ? 'text-[var(--neo-accent)] border-[var(--neo-accent)]' : 'text-[var(--text-3)] border-transparent hover:text-[var(--text-2)]'}`}>
            {label} ({count})
          </button>
        ))}
      </div>
      <div className="px-3 py-[14px] text-[11.5px] text-[var(--text-3)] text-center italic">
        {activeTab === 'Today Events' && 'No events today'}
        {activeTab === 'All Scheduled Events' && '1 scheduled event'}
        {activeTab === 'Action Plans' && '2 action plans active'}
      </div>
    </div>
  )
}