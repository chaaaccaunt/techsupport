import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Отсутствуют переменные окружения Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типы для базы данных
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'department_head' | 'user';
  department: string | null;
  phone: string | null;
  position: string | null;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  building: string | null;
  floor: string | null;
  room: string | null;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string | null;
  serial_number: string | null;
  manufacturer: string | null;
  purchase_date: string | null;
  warranty_expiry: string | null;
  status: 'active' | 'maintenance' | 'inactive' | 'broken';
  department: string;
  location_id: string | null;
  responsible_user_id: string | null;
  description: string | null;
  specifications: any;
  created_at: string;
  updated_at: string;
  location?: Location;
  responsible_user?: Profile;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  equipment_id: string | null;
  created_by: string;
  assigned_to: string | null;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  equipment?: Equipment;
  creator?: Profile;
  assignee?: Profile;
}

export interface MaintenanceHistory {
  id: string;
  equipment_id: string;
  ticket_id: string | null;
  maintenance_type: 'preventive' | 'corrective' | 'inspection' | 'upgrade';
  performed_by: string;
  description: string;
  cost: number | null;
  parts_replaced: string[] | null;
  next_maintenance_date: string | null;
  performed_at: string;
  created_at: string;
  equipment?: Equipment;
  performer?: Profile;
}
