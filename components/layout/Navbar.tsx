'use client';
import { useState } from 'react';
import Toggle from '@/components/ui/Toggle';

interface NavbarProps {
  onAddLead: () => void;
}

export default function Navbar({ onAddLead }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [away, setAway] = useState(false);

  return (
    <nav className="flex items-center mb-10 h-[52px] px-[14px] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] gap-[10px] shrink-0 shadow-[0_2px_20px_rgba(37,99,235,.35)] relative z-50">
      <div className="flex items-center justify-between gap-[10px] flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center gap-[7px] shrink-0">
          <div className="w-7 h-7 bg-white/20 rounded-[7px] flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <span className="text-[17px] font-extrabold text-white tracking-[-0.5px]">B&G CRM</span>
        </div>
        <button onClick={onAddLead} className="flex items-center gap-[6px] px-3 py-[5px] rounded-lg text-[11.5px] font-bold text-white bg-white/[0.15] border border-white/[0.25] hover:bg-white/[0.25] transition-all shrink-0 ml-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Add New Lead
        </button>
      </div>
      <div className="flex items-center gap-[7px] shrink-0">
        {/* <Toggle checked={away} onChange={() => setAway(!away)} label="Away from desk" /> */}
      </div>
    </nav>
  );
}