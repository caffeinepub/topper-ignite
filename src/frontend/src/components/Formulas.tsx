import {
  AlertCircle,
  Calendar,
  ChevronRight,
  FileText,
  Loader2,
  Lock,
  LogIn,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeletePDF,
  useGetAllPDFs,
  useIsCallerAdmin,
} from "../hooks/useQueries";
import AdminUploadPanel from "./AdminUploadPanel";
import PDFViewer from "./PDFViewer";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Formulas() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const {
    data: pdfs,
    isLoading: pdfsLoading,
    isError: pdfsError,
  } = useGetAllPDFs();
  const { data: isAdmin } = useIsCallerAdmin();
  const deletePDF = useDeletePDF();

  const [selectedPDF, setSelectedPDF] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  return (
    <section
      data-ocid="formulas.section"
      className="py-20 bg-site-bg relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-fire/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-fire/15 border border-brand-fire/30 rounded-full px-4 py-2 mb-4">
            <FileText className="w-4 h-4 text-brand-fire" />
            <span className="text-brand-fire text-sm font-semibold uppercase tracking-wide">
              Formula Sheets
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Class 12 Math{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-fire to-brand-gold">
              Formula PDFs
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            RBSC NCERT ke saare important formulas ek jagah — sirf registered
            students ke liye.
          </p>
        </div>

        {/* Not Logged In State */}
        {!isAuthenticated ? (
          <div data-ocid="formulas.login_prompt" className="max-w-lg mx-auto">
            <div className="bg-site-card border border-white/10 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-fire/5 to-transparent pointer-events-none rounded-3xl" />

              <div className="relative">
                {/* Lock icon */}
                <div className="mx-auto w-20 h-20 rounded-2xl bg-brand-fire/10 border border-brand-fire/20 flex items-center justify-center mb-6">
                  <Lock className="w-9 h-9 text-brand-fire" />
                </div>

                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Login karein Formula Sheets dekhne ke liye
                </h3>
                <p className="text-white/50 text-base mb-8 leading-relaxed">
                  Yeh PDF sheets sirf registered students ke liye available
                  hain. Login karein aur apni padhai ko boost karein! 🚀
                </p>

                {/* Features list */}
                <div className="grid grid-cols-1 gap-3 mb-8 text-left">
                  {[
                    "Saare chapters ke formula sheets",
                    "RBSC NCERT syllabus ke according",
                    "Easy-to-read format",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-white/60 text-sm"
                    >
                      <ChevronRight className="w-4 h-4 text-brand-fire flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  data-ocid="formulas.login_button"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-fire to-brand-ember text-white font-bold text-base py-4 rounded-2xl hover:opacity-90 transition-all duration-200 disabled:opacity-60 shadow-xl shadow-brand-fire/30 hover:scale-[1.02]"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Login ho raha hai...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Login karein
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In State */
          <div className="space-y-8">
            {/* Admin Upload Section */}
            {isAdmin && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-fire animate-pulse" />
                    <span className="text-brand-fire text-sm font-semibold">
                      Admin Panel
                    </span>
                  </div>
                  <button
                    type="button"
                    data-ocid="formulas.upload_button"
                    onClick={() => setShowUploadPanel((v) => !v)}
                    className="flex items-center gap-2 bg-brand-fire/15 border border-brand-fire/30 hover:border-brand-fire/60 text-brand-fire hover:text-white hover:bg-brand-fire text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    {showUploadPanel ? "Cancel" : "PDF Upload karo"}
                  </button>
                </div>

                {showUploadPanel && (
                  <AdminUploadPanel onClose={() => setShowUploadPanel(false)} />
                )}
              </div>
            )}

            {/* PDF Grid */}
            {pdfsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-white/50">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-fire" />
                  <span>Formula sheets load ho rahi hain...</span>
                </div>
              </div>
            ) : pdfsError ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    PDFs load karne mein error. Please refresh karein.
                  </span>
                </div>
              </div>
            ) : !pdfs || pdfs.length === 0 ? (
              <div className="text-center py-20">
                <div
                  data-ocid="formulas.empty_state"
                  className="inline-flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/50 text-base font-semibold">
                      Abhi koi PDF available nahi hai
                    </p>
                    <p className="text-white/30 text-sm mt-1">
                      {isAdmin
                        ? "Upar se PDF upload karein."
                        : "Jald hi formula sheets available hongi!"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pdfs.map((pdf, index) => (
                  <button
                    type="button"
                    key={pdf.id.toString()}
                    data-ocid={`formulas.pdf_card.${index + 1}`}
                    className="group bg-site-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand-fire/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-fire/10 cursor-pointer text-left"
                    onClick={() =>
                      setSelectedPDF({
                        url: pdf.blobId.getDirectURL(),
                        title: pdf.title,
                      })
                    }
                  >
                    {/* Card Top — PDF Icon Area */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-fire/10 via-site-surface to-site-card flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-site-card/80" />
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-6 gap-2 p-4 h-full">
                          {Array.from(
                            { length: 24 },
                            (_, i) => `cell-${i}`,
                          ).map((cellKey) => (
                            <div
                              key={cellKey}
                              className="bg-white/50 rounded text-xs leading-tight overflow-hidden"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-16 h-20 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-8 h-8 text-brand-fire" />
                        </div>
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                          PDF
                        </span>
                      </div>
                      {/* Lock badge */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full p-1.5">
                        <Lock className="w-3 h-3 text-brand-gold" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-white text-sm leading-snug mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
                        {pdf.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/35 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(pdf.uploadedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isAdmin && (
                            <button
                              type="button"
                              data-ocid={`formulas.pdf_card.${index + 1}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`"${pdf.title}" delete karein?`)) {
                                  deletePDF.mutate(pdf.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              aria-label="Delete PDF"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-brand-fire hover:text-brand-gold text-xs font-semibold transition-colors"
                            aria-label="View PDF"
                          >
                            <span>Dekho</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <PDFViewer
          url={selectedPDF.url}
          title={selectedPDF.title}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </section>
  );
}
