import { Lock, ShieldAlert, X } from "lucide-react";
import { useEffect } from "react";

interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      data-ocid="pdf_viewer.dialog"
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-site-footer border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-fire/20 border border-brand-fire/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-brand-fire" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold font-heading truncate text-sm sm:text-base">
              {title}
            </p>
            <p className="text-white/40 text-xs flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              Protected — Download & copy disabled
            </p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="pdf_viewer.close_button"
          onClick={onClose}
          className="flex-shrink-0 ml-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200"
          aria-label="Close PDF viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* PDF Iframe Container */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          title={title}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          style={{ pointerEvents: "auto" }}
        />
        {/* Invisible overlay to catch right-clicks on the iframe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
