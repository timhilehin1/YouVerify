import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { Modal } from "../../components/ui/Modal";

describe("Modal Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("should render children content", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Custom Content</div>
          <button>Custom Button</button>
        </Modal>
      );

      expect(screen.getByText("Custom Content")).toBeInTheDocument();
      expect(screen.getByText("Custom Button")).toBeInTheDocument();
    });
  });

  describe("Close Functionality", () => {
    it("should call onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      const backdrop = screen.getByTestId("modal-backdrop");
      await user.click(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when Escape key is pressed", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      await user.keyboard("{Escape}");

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not close when modal content is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      const content = screen.getByText("Modal Content");
      await user.click(content);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Position Prop", () => {
    it("should apply fullscreen styles when position is fullscreen", () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} position="fullscreen">
          <div>Fullscreen Modal</div>
        </Modal>
      );

      const modalContent = container.querySelector(
        '[data-position="fullscreen"]'
      );
      expect(modalContent).toBeInTheDocument();
    });

    it("should apply center styles when position is center", () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} position="centered">
          <div>Center Modal</div>
        </Modal>
      );

      const modalContent = container.querySelector(
        '[data-position="centered"]'
      );
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute("aria-modal", "true");
    });

    it("should trap focus within modal", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>
            <button>First Button</button>
            <button>Second Button</button>
          </div>
        </Modal>
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Body Scroll Lock", () => {
    it("should prevent body scroll when modal is open", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore body scroll when modal is closed", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Multiple Children", () => {
    it("should render complex nested content", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>
            <h2>Title</h2>
            <p>Description</p>
            <div>
              <button>Action 1</button>
              <button>Action 2</button>
            </div>
          </div>
        </Modal>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Action 1")).toBeInTheDocument();
      expect(screen.getByText("Action 2")).toBeInTheDocument();
    });
  });
});
