import {
  AlertCircle,
  CheckCircle,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../backend";
import { useAddPDF } from "../hooks/useQueries";

interface AdminUploadPanelProps {
  onClose: () => void;
}

export default function AdminUploadPanel({ onClose }: AdminUploadPanelProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPDF = useAddPDF();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.pdf$/i, ""));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setUploadProgress(0);

    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setUploadProgress(pct);
    });

    addPDF.mutate(
      { title: title.trim(), blob },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose();
          }, 1500);
        },
      },
    );
  };

  const isUploading = addPDF.isPending;
  const isSuccess = addPDF.isSuccess;
  const isError = addPDF.isError;

  return (
    <div className="bg-site-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-fire/20 border border-brand-fire/30 flex items-center justify-center">
            <Upload className="w-4 h-4 text-brand-fire" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-sm">
              Upload Formula PDF
            </h3>
            <p className="text-white/40 text-xs">Admin only</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close upload panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title Input */}
        <div className="space-y-2">
          <label
            htmlFor="pdf-title"
            className="text-white/70 text-xs font-semibold uppercase tracking-wide"
          >
            PDF Title
          </label>
          <input
            id="pdf-title"
            data-ocid="admin_upload.title_input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Trigonometry Formulas – Chapter 3"
            className="w-full bg-site-surface border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-fire/50 focus:ring-1 focus:ring-brand-fire/30 transition-all"
            disabled={isUploading || isSuccess}
            required
          />
        </div>

        {/* File Drop Zone */}
        <div className="space-y-2">
          <span className="text-white/70 text-xs font-semibold uppercase tracking-wide">
            PDF File
          </span>
          <label
            htmlFor="pdf-file-input"
            data-ocid="admin_upload.dropzone"
            className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col ${
              isDragging
                ? "border-brand-fire bg-brand-fire/10"
                : file
                  ? "border-brand-gold/50 bg-brand-gold/5"
                  : "border-white/20 bg-white/5 hover:border-white/40"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              id="pdf-file-input"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              disabled={isUploading || isSuccess}
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-brand-gold" />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-white/40 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!isUploading && !isSuccess && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="ml-auto p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-2">
                <Upload className="w-8 h-8 text-white/30" />
                <p className="text-white/50 text-sm">
                  Drop PDF here or click to browse
                </p>
                <p className="text-white/25 text-xs">
                  Only .pdf files accepted
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Progress Bar */}
        {isUploading && (
          <div data-ocid="admin_upload.loading_state" className="space-y-2">
            <div className="flex justify-between text-xs text-white/50">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-brand-fire to-brand-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div
            data-ocid="admin_upload.success_state"
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm font-semibold">
              PDF uploaded successfully!
            </p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div
            data-ocid="admin_upload.error_state"
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">
              Upload failed. Please try again.
            </p>
          </div>
        )}

        {/* Submit Button */}
        {!isSuccess && (
          <button
            data-ocid="admin_upload.upload_button"
            type="submit"
            disabled={!file || !title.trim() || isUploading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-fire to-brand-ember text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-fire/20"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading PDF...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload PDF
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
