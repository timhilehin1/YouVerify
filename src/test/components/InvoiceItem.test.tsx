import { render, screen } from "@testing-library/react";
import { InvoiceItem } from "../../components/ui/InvoiceItem";
import { describe, it, expect, vi } from "vitest";
import type { InvoiceItemProps } from "../../components/ui/InvoiceItem"; // import props type

const defaultProps: InvoiceItemProps = {
  status: "paid",
  amount: "5000",
  dueDate: "2025-10-05",
  id: "Invoice-001",
  onClick: vi.fn(),
};

describe("InvoiceItem Component", () => {
  it("should render invoice id instead of client", () => {
    render(<InvoiceItem {...defaultProps} />);
    expect(screen.getByText(/Invoice-001/)).toBeInTheDocument();
  });

  it("should render amount twice (mobile + desktop)", () => {
    render(<InvoiceItem {...defaultProps} />);
    const amounts = screen.getAllByText("$5,000.00");
    expect(amounts).toHaveLength(2);
  });

  it("should render due date correctly", () => {
    render(<InvoiceItem {...defaultProps} />);
    expect(screen.getByText(/2025-10-05/)).toBeInTheDocument();
  });

  it("should render status badge with correct style (PAID)", () => {
    render(<InvoiceItem {...defaultProps} />);
    const statusBadge = screen.getByText(/paid/i);
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("text-[#129043]");
  });

  it("should handle zero amounts", () => {
    render(<InvoiceItem {...defaultProps} amount={"0"} />);
    expect(screen.getAllByText("$0.00")).toHaveLength(2);
  });

  it("should render status DRAFT correctly", () => {
    render(<InvoiceItem {...defaultProps} status="draft" />);
    const badge = screen.getByText(/draft/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-[#666F77]");
  });

  it("should render status UNPAID correctly", () => {
    render(<InvoiceItem {...defaultProps} status="unpaid" />);
    const badge = screen.getByText(/unpaid/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-[#B54708]");
  });

  it("should render status OVERDUE correctly", () => {
    render(<InvoiceItem {...defaultProps} status="overdue" />);
    const badge = screen.getByText(/overdue/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-[#D0021B]");
  });
});
