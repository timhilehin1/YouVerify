import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Invoice from "../../pages/Invoice";
import * as InvoiceService from "../../lib/services/Invoice";

// Mock the services
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

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockInvoices = [
  {
    id: "1",
    invoice_id: "INV-001",
    due_date: "2025-10-15",
    total_amount: 5000,
    status: "paid",
    recipient_name: "John Doe",
    recipient_email: "john@example.com",
    recipient_phone: "1234567890",
    created_at: "2025-09-01",
    invoice_items: [
      {
        id: "1",
        item_name: "Service A",
        quantity: 2,
        unit_price: 2500,
        total_price: 5000,
      },
    ],
  },
  {
    id: "2",
    invoice_id: "INV-002",
    due_date: "2025-10-20",
    total_amount: 3000,
    status: "unpaid",
    recipient_name: "Jane Smith",
    recipient_email: "jane@example.com",
    recipient_phone: "0987654321",
    created_at: "2025-09-05",
    invoice_items: [],
  },
];

const mockStats = {
  paid: { count: 5, total: 15000 },
  unpaid: { count: 3, total: 8000 },
  overdue: { count: 2, total: 5000 },
  draft: { count: 1, total: 2000 },
};

describe("Invoice Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    it("should render the page title", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      expect(screen.getByText("Invoice")).toBeInTheDocument();
    });

    it("should render action buttons", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      expect(screen.getByText("SEE WHAT'S NEW")).toBeInTheDocument();
      expect(screen.getByText("CREATE")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should show loading skeletons while fetching data", () => {
      vi.mocked(InvoiceService.getInvoices).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      vi.mocked(InvoiceService.getInvoiceStats).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Invoice />);

      // Should show skeleton loaders
      const skeletons = screen.getAllByTestId(/skeleton/i);
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe("Data Fetching", () => {
    it("should fetch and display invoices", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
        expect(screen.getByText("INV-002")).toBeInTheDocument();
      });
    });

    it("should fetch and display statistics", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("TOTAL PAID")).toBeInTheDocument();
        expect(screen.getByText("TOTAL UNPAID")).toBeInTheDocument();
        expect(screen.getByText("TOTAL OVERDUE")).toBeInTheDocument();
        expect(screen.getByText("TOTAL DRAFT")).toBeInTheDocument();
      });
    });

    it("should handle fetch errors gracefully", async () => {
      const error = new Error("Failed to fetch");
      vi.mocked(InvoiceService.getInvoices).mockRejectedValue(error);
      vi.mocked(InvoiceService.getInvoiceStats).mockRejectedValue(error);

      render(<Invoice />);

      await waitFor(() => {
        expect(InvoiceService.getInvoices).toHaveBeenCalled();
      });
    });
  });

  describe("Invoice Interaction", () => {
    it("should open modal when invoice is clicked", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      const invoiceItem = screen.getByText("INV-001");
      await user.click(invoiceItem);

      // Modal should be open with invoice details
      await waitFor(() => {
        expect(screen.getByText("View the details and activity of this invoice")).toBeInTheDocument();
      });
    });

    it("should close modal when close button is clicked", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      // Open modal
      const invoiceItem = screen.getByText("INV-001");
      await user.click(invoiceItem);

      // Close modal
      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("View the details and activity of this invoice")).not.toBeInTheDocument();
      });
    });
  });

  describe("Invoice Details Modal", () => {
    it("should display correct invoice information in modal", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      const invoiceItem = screen.getByText("INV-001");
      await user.click(invoiceItem);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
      });
    });

    it("should calculate subtotal, discount, and total correctly", async () => {
      const user = userEvent.setup();
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("INV-001")).toBeInTheDocument();
      });

      const invoiceItem = screen.getByText("INV-001");
      await user.click(invoiceItem);

      await waitFor(() => {
        // Subtotal should be 5000
        expect(screen.getByText(/5,000/)).toBeInTheDocument();
        // Discount 2.5% of 5000 = 125
        expect(screen.getByText(/125/)).toBeInTheDocument();
        // Total should be 4875
        expect(screen.getByText(/4,875/)).toBeInTheDocument();
      });
    });
  });

  describe("Action Cards", () => {
    it("should render all action cards", async () => {
      vi.mocked(InvoiceService.getInvoices).mockResolvedValue(mockInvoices);
      vi.mocked(InvoiceService.getInvoiceStats).mockResolvedValue(mockStats);

      render(<Invoice />);

      await waitFor(() => {
        expect(screen.getByText("Create New Invoice")).toBeInTheDocument();
        expect(screen.getByText("Change Invoice settings")).toBeInTheDocument();
        expect(screen.getByText("Manage Customer list")).toBeInTheDocument();
      });
    });
  });
});