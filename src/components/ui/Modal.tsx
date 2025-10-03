import React, { useEffect } from "react";
import clsx from "clsx";
import CloseIcon from "./icons/CloseIcon"; 

type ModalSize = "sm" | "md" | "lg" | "full";
type ModalPosition = "centered" | "fullscreen";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  className?: string;
  overlayClass?: string;
  showCloseButton?: boolean;
}

// Size classes for centered modals
const centeredSizeClasses: Record<Exclude<ModalSize, "full">, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};


export function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  position = "centered",
  className,
  overlayClass,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isFullscreen = position === "fullscreen" || size === "full";

  return (
    <div
      data-testid="modal-backdrop"
      className={clsx(
        "fixed inset-0 z-50 flex",
        "bg-gray-900/60 backdrop-blur-sm transition-all duration-300 ease-in-out",
        overlayClass
      )}
      onClick={onClose}
    >
      {/* Scrollable Container */}
      <div
        className={clsx(
          "w-full overflow-y-auto",
          isFullscreen
            ? "p-4 sm:p-6 md:p-8"
            : "p-4 sm:p-6 flex items-center justify-center"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* MODAL CONTENT */}
        <div
          role="dialog"
          aria-modal="true"
          data-testid="modal-content"
          data-position={isFullscreen ? "fullscreen" : "centered"}
          className={clsx(
            "relative w-full bg-white rounded-xl shadow-2xl",
            
            isFullscreen && [
              "min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-5rem)]",
              "my-auto",
            ],
           
            !isFullscreen && [
              "min-h-[200px]",
              "my-8",
              centeredSizeClasses[size as Exclude<ModalSize, "full">],
            ],
            "p-6 sm:p-8",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON (OUTSIDE - TOP RIGHT) */}
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 p-2 bg-white  focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full shadow-lg hover:shadow-xl z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <CloseIcon className="w-8 h-8" />
            </button>
          )}

          {/* MODAL CONTENT */}
          <div className={isFullscreen ? "h-full" : ""}>{children}</div>
        </div>
      </div>
    </div>
  );
}
