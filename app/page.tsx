'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import StatsBar from '@/components/layout/StatsBar';
import Toolbar from '@/components/toolbar/Toolbar';
import LeadsList from '@/components/leads/LeadsList';
import AddLeadModal from '@/components/leads/AddLeadModal';
import type { Lead } from '@/types';
import { LEADS } from '@/data/mockData';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(LEADS);

  function handleAddLead(lead: Lead) {
    setLeads((prev) => [lead, ...prev]);
  }

  function handleUpdateLead(updated: Lead) {
    setLeads((prev) => prev.map((l) => l.id === updated.id ? updated : l));
  }

  return (
    <div className="root">
      <Navbar onAddLead={() => setModalOpen(true)} />
      {/* <StatsBar />
      <Toolbar /> */}
      <LeadsList leads={leads} onUpdateLead={handleUpdateLead} />

      {modalOpen && (
        <AddLeadModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAddLead}
        />
      )}
    </div>
  );
}