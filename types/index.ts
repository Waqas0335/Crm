// ─── Lead & Event Types ────────────────────────────────────────────────────────

export type LeadStatus = 'Active' | 'Lost' | 'Pending';
export type LeadChannel = 'Online' | 'Lead';
export type LeadSource = 'Website' | 'Facebook' | 'CarDealer' | string;

export interface LeadEvent {
  type: 'followup' | 'text';
  kind: string;
  desc: string;
  sender: string;
  time: string;
}

export interface Lead {
  id: number;
  status: LeadStatus;
  channel: LeadChannel;
  date: string;
  age: string;
  location: string;
  name: string;
  phone: string;
  coName?: string;
  coPhone?: string;
  sales?: string | null;
  decision?: string | null;
  source: LeadSource;
  detail?: string | null;
  bdr?: string | null;
  lot?: string | null;
  bdr2?: string | null;
  down?: string | null;
  stips: number;
  tags?: string[];
  inventory?: string | null;
  tiers?: string | null;
  email?: string | null;
  utmTerm?: string | null;
  utmMedium?: string | null;
  events?: LeadEvent[];
}

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export type ActivityType = 'email' | 'followup' | 'status' | 'text' | 'esign' | 'note';

export interface ActivityItem {
  type: ActivityType;
  kind: string;
  desc: string;
  actor: string;
  time: string;
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export type StatVariant = 'p' | 'w' | 'd' | 'g' | 'i' | '';

export interface StatItem {
  label: string;
  value: number;
  variant: StatVariant;
}

export interface StatGroup {
  label: string;
  colorClass: string;
  stats: StatItem[];
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

export type NoteType =
  | 'General note'
  | 'Call note'
  | 'Appointment note'
  | 'Finance note'
  | 'Sales note'
  | 'Status change';

export type ActivityTab = 'Make note' | 'Create event' | 'Send text/email';

export type EventsTab = 'Today Events' | 'All Scheduled Events' | 'Action Plans';

export interface ActivityFilters {
  text: boolean;
  notes: boolean;
  events: boolean;
  activity: boolean;
}

// ─── Toolbar ───────────────────────────────────────────────────────────────────

export type SortOption = 'Recently updated' | 'Date created' | 'Name A-Z' | 'Status';
export type ListView = 'Live' | 'Static';

export interface ToolbarState {
  location: string;
  loadCount: string;
  listView: ListView;
  staticFilter: boolean;
  sortBy: SortOption;
  search: string;
  filtersOpen: boolean;
  compactView: boolean;
}