export interface UserProfile {
  id: string; // uuid
  business_name?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: Record<string, any> | null; // jsonb
  logo_url?: string | null;
  company_color?: string | null;
  invoice_prefix?: string | null; // default: 'yvrf'
  next_invoice_number?: number | null; // default: 1
  default_terms_and_conditions?: string | null;
  default_payment_terms?: number | null; // default: 30
  created_at?: string | null; // timestamp with time zone
  updated_at?: string | null; // timestamp with time zone
}
