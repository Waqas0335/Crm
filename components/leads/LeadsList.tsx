'use client';

import { useState, useEffect } from 'react';
import LeadCard from './LeadCard';
import DetailPanel from '@/components/detail/DetailPanel';
import type { Lead } from '@/types';

interface LeadsListProps {
  leads?: Lead[];
  onUpdateLead: (updated: Lead) => void;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function LeadTable({ leads, selectedLead, onSelect }: {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelect: (lead: Lead) => void;
}) {
  const lbl = "text-[10px] font-bold uppercase tracking-[0.7px] text-slate-400";
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,.05)] overflow-hidden">
      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        {/* Min width ensures columns never collapse */}
        <div className="min-w-[560px]">

          {/* Header */}
          <div className="flex items-center px-4 py-2.5 bg-slate-50 border-b-2 border-slate-200 sticky top-0 z-10 border-l-[3px] border-l-transparent">
            <div className="w-[48px] shrink-0" />
            <div className="w-[180px] shrink-0 pr-2"><span className={lbl}>Name</span></div>
            <div className="w-[130px] shrink-0 pr-2"><span className={lbl}>BDR</span></div>
            <div className="flex-1 min-w-[120px]"><span className={lbl}>Status</span></div>
            <div className="w-[70px] shrink-0 text-left md:text-right"><span className={lbl}>Action</span></div>
          </div>

          {/* Rows */}
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              selected={selectedLead?.id === lead.id}
              onClick={() => onSelect(lead)}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default function LeadsList({ leads = [], onUpdateLead }: LeadsListProps) {
  const isMobile = useIsMobile();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (!isMobile && leads.length > 0) {
      setSelectedLead(leads[0]);
    }
  }, [isMobile]);

  function handleSelect(lead: Lead) {
    setSelectedLead((prev) => (prev?.id === lead.id ? null : lead));
  }

  function handleUpdateLead(updated: Lead) {
    onUpdateLead(updated);
    setSelectedLead(updated);
  }

  if (isMobile) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className={`overflow-y-auto p-2 bg-[var(--navy)] ${selectedLead ? 'max-h-[45vh]' : 'flex-1'}`}>
          <LeadTable leads={leads} selectedLead={selectedLead} onSelect={handleSelect} />
        </div>
        {selectedLead && (
          <div className="flex-1 overflow-y-auto border-t border-slate-200">
            <DetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdateLead={handleUpdateLead} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="body">
      <div className={`ll${selectedLead ? ' wp' : ''}`}>
        <LeadTable leads={leads} selectedLead={selectedLead} onSelect={handleSelect} />
      </div>
      {selectedLead && (
        <DetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdateLead={handleUpdateLead} />
      )}
    </div>
  );
}