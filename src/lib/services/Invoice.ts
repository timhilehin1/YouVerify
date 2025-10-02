import { supabase } from "../supabase";

export async function getInvoiceStats() {
  const { data, error } = await supabase
    .from("invoices")
    .select("status, total_amount");

  if (error) throw error;

  // reduce to counts + sums in JS
  const stats = data.reduce((acc, row) => {
    if (!acc[row.status]) acc[row.status] = { count: 0, total: 0 };
    acc[row.status].count += 1;
    acc[row.status].total += Number(row.total_amount);
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  return stats;
}

export async function getInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select(
      `
      *,
      invoice_items (*),
      payment_information:payment_information_id (*)
    `
    )
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data;
}
