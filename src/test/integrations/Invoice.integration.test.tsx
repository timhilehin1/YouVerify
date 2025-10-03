import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import * as InvoiceService from "../../lib/services/Invoice";
import Invoice from "../../pages/Invoice";

vi.mock("../lib/services/Invoice");
vi.mock("../lib/supabase", () => ({
  supabase: {
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn((callback) => {
        callback("SUBSCRIBED");
        return { unsubscribe: vi.fn() };
      }),
    })),
    removeChannel: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockInvoiceWithItems = {
  id: "1",
  invoice_id: "INV-001",
  due_date: "2025-10-15",
  total_amount: 10000,
  status: "unpaid",
  recipient_name: "John Doe",
  recipient_email: "john@example.com",
  recipient_phone: "1234567890",
  created_at: "2025-09-01",
  notes: "Thank you for your business",
  invoice_items: [
    {
      id: "1",
      item_name: "Web Development",
      description: "Frontend development services",
      quantity: 2,
      unit_price: 3000,
      total_price: 6000,
    },
    {
      id: "2",
      item_name: "Design Services",
      description: "UI/UX design",
      quantity: 1,
      unit_price: 4000,
      total_price: 4000,
    },
  ],
};

const mockStats = {
  paid: { count: 5, total: 15000 },
  unpaid: { count: 3, total: 10000 },
  overdue: { count: 2, total: 5000 },
  draft: { count: 1, total: 2000 },
};

describe("Invoice Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Complete User Flow", () => {
    it("should load page, display invoices, and open invoice details", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      // Verify stats are displayed
      expect(screen.getByText("TOTAL UNPAID")).toBeInTheDocument();
      expect(screen.getByText(/10,000/)).toBeInTheDocument();

      // Click on invoice to open details
      const invoiceItem = screen.getByText("INV-001");
      await user.click(invoiceItem);

      // Verify modal opens with details
      await waitFor(() => {
        expect(
          screen.getByText("View the details and activity of this invoice")
        ).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Web Development")).toBeInTheDocument();
        expect(screen.getByText("Design Services")).toBeInTheDocument();
      });
    });

    it("should calculate invoice totals correctly in modal", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      // Open invoice details
      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        // Subtotal: 6000 + 4000 = 10000
        const subtotalElements = screen.getAllByText(/10,000/);
        expect(subtotalElements.length).toBeGreaterThan(0);

        // Discount: 10000 * 0.025 = 250
        expect(screen.getByText(/250/)).toBeInTheDocument();

        // Total: 10000 - 250 = 9750
        expect(screen.getByText(/9,750/)).toBeInTheDocument();
      });
    });

    it("should display all invoice items with correct calculations", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        // First item
        expect(screen.getByText("Web Development")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument(); // quantity
        expect(screen.getByText(/3,000/)).toBeInTheDocument(); // unit price
        expect(screen.getByText(/6,000/)).toBeInTheDocument(); // total

        // Second item
        expect(screen.getByText("Design Services")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText(/4,000/)).toBeInTheDocument();
      });
    });
  });

  describe("Modal Interaction", () => {
    it("should open and close modal correctly", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      // Open modal
      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        expect(
          screen.getByText("View the details and activity of this invoice")
        ).toBeInTheDocument();
      });

      // Close modal
      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("View the details and activity of this invoice")
        ).not.toBeInTheDocument();
      });
    });

    it("should display payment information in modal", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        expect(screen.getByText("PAYMENT INFORMATION")).toBeInTheDocument();
        expect(screen.getByText("PAYSTACK TITAN")).toBeInTheDocument();
        expect(screen.getByText("YABA")).toBeInTheDocument();
      });
    });

    it("should display reminders section in modal", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        expect(screen.getByText("REMINDERS")).toBeInTheDocument();
      });
    });
  });

  describe("Statistics Display", () => {
    it("should display all statistics correctly", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        // Check all stat cards are present
        expect(screen.getByText("TOTAL PAID")).toBeInTheDocument();
        expect(screen.getByText("TOTAL UNPAID")).toBeInTheDocument();
        expect(screen.getByText("TOTAL OVERDUE")).toBeInTheDocument();
        expect(screen.getByText("TOTAL DRAFT")).toBeInTheDocument();

        // Check counts
        expect(screen.getByText(/5/)).toBeInTheDocument(); // paid count
        expect(screen.getByText(/3/)).toBeInTheDocument(); // unpaid count
        expect(screen.getByText(/2/)).toBeInTheDocument(); // overdue count
        expect(screen.getByText(/1/)).toBeInTheDocument(); // draft count
      });
    });

    it("should handle zero statistics gracefully", async () => {
      const emptyStats = {
        paid: { count: 0, total: 0 },
        unpaid: { count: 0, total: 0 },
        overdue: { count: 0, total: 0 },
        draft: { count: 0, total: 0 },
      };

      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(emptyStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("TOTAL PAID")).toBeInTheDocument();
        expect(screen.getByText("TOTAL UNPAID")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      vi.mocked(InvoiceService.getInvoices).mockRejectedValue(
        new Error("Network error")
      );
      vi.mocked(InvoiceService.getInvoiceStats).mockRejectedValue(
        new Error("Network error")
      );

      render(<Invoice />);

      await waitFor(() => {
        expect(InvoiceService.getInvoices).toHaveBeenCalled();
        expect(InvoiceService.getInvoiceStats).toHaveBeenCalled();
      });

      consoleError.mockRestore();
    });

    it("should continue to work after recovering from error", async () => {
      // First call fails
      vi.mocked(InvoiceService.getInvoices)
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce([mockInvoiceWithItems]);

      vi.mocked(InvoiceService.getInvoiceStats)
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce(mockStats);

      const { rerender } = render(<Invoice />);

      await waitFor(() => {
        expect(InvoiceService.getInvoices).toHaveBeenCalled();
      });

      // Trigger re-fetch by rerendering
      rerender(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });
    });
  });

  describe("Empty States", () => {
    it("should handle empty invoice list", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("Recent Invoices")).toBeInTheDocument();
      });

      // Should not show any invoice items
      expect(screen.queryByText(/INV-/)).not.toBeInTheDocument();
    });

    it("should handle invoice with no items", async () => {
      const user = userEvent.setup();
      const invoiceNoItems = {
        ...mockInvoiceWithItems,
        invoice_items: [],
      };

      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([invoiceNoItems]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        // Modal should open but show no items
        expect(
          screen.getByText("View the details and activity of this invoice")
        ).toBeInTheDocument();

        // Totals should be 0
        const totalElements = screen.getAllByText(/0/);
        expect(totalElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should show tabs on mobile view", async () => {
      // Mock mobile viewport
      global.innerWidth = 375;
      global.dispatchEvent(new Event("resize"));

      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      await user.click(screen.getByText("INV-001"));

      await waitFor(() => {
        // Tabs should be visible on mobile
        expect(screen.getByText("Invoice Details")).toBeInTheDocument();
        expect(screen.getByText("Recent Activity")).toBeInTheDocument();
      });
    });
  });

  describe("Real-time Updates", () => {
    it("should set up Supabase realtime subscription on mount", () => {
      const { supabase } = require("../lib/supabase");
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      expect(supabase.channel).toHaveBeenCalledWith("invoices-changes");
    });

    it("should clean up subscription on unmount", () => {
      const { supabase } = require("../lib/supabase");
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue([
        mockInvoiceWithItems,
      ]);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      const { unmount } = render(<Invoice />);
      unmount();

      expect(supabase.removeChannel).toHaveBeenCalled();
    });
  });
});
