export interface InvoiceData {
  id: string;
  invoice_id: string;
  user_id?: string | null;
  status: "draft" | "unpaid" | "paid" | "overdue";
  created_at?: string;
  generated_date: string;
  due_date: string;
  paid_date?: string | null;
  subtotal: number;
  discount_percentage?: number | null;
  discount_amount?: number | null;
  tax_percentage?: number | null;
  tax_amount?: number | null;
  total_amount: string;
  amount_paid?: number | null;
  amount_due: number;
  recipient_name: string;
  recipient_email?: string | null;
  recipient_phone?: string | null;
  recipient_address?: Record<string, any> | null;
  notes?: string | null;
  terms_and_conditions?: string | null;
  invoice_items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id?: string | null;
  item_name: string;
  description?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  sort_order?: number | null;
  created_at?: string | null;
}

export interface PaymentInformation {
  id: string;
  user_id?: string | null;
  invoice_id?: string | null;
  account_name: string;
  account_number: string;
  routing_number?: string | null;
  bank_name: string;
  bank_address?: string | null;
  is_default?: boolean | null;
  created_at?: string | null;
}
