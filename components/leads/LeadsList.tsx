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

export default function LeadsList({ leads = [], onUpdateLead }: LeadsListProps) {
  const isMobile = useIsMobile();

  // Always start with null to match server render, then set on client
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Only auto-select first lead on desktop after hydration
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
        <div className={`overflow-y-auto flex flex-col gap-2 p-2 bg-[var(--navy)] ${selectedLead ? 'max-h-[40vh]' : 'flex-1'}`}>
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              selected={selectedLead?.id === lead.id}
              onClick={() => handleSelect(lead)}
            />
          ))}
        </div>
        {selectedLead && (
          <div className="flex-1 overflow-y-auto border-t border-slate-200">
            <DetailPanel
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onUpdateLead={handleUpdateLead}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="body">
      <div className={`ll${selectedLead ? ' wp' : ''}`}>
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            selected={selectedLead?.id === lead.id}
            onClick={() => handleSelect(lead)}
          />
        ))}
      </div>
      {selectedLead && (
        <DetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={handleUpdateLead}
        />
      )}
    </div>
  );
}