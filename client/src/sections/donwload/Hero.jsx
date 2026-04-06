import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
import {
    DownloadIcon,
    FileArchive,
    ArrowRight,
    Monitor,
    X,
    AlertTriangle,
} from "lucide-react";

/** Troque para `"available"` quando a build estiver pronta para download. */
const MIDJOURNEY_STATUS = "updating";

const dashedPanel =
    "rounded-2xl border border-dashed border-neutral-300/90 bg-neutral-50/50 px-6 py-8 dark:border-neutral-700 dark:bg-neutral-900/40";

/** Abaixo de `lg` (1024px) o download é bloqueado — alinhado ao breakpoint lg do Tailwind. */
function isBelowLargeViewport() {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(max-width: 1023px)").matches;
}

function extensionZipUrl(zipFile) {
    const base = import.meta.env.BASE_URL || "/";
    const root = base.endsWith("/") ? base.slice(0, -1) : base;
    return `${root}/extension/${zipFile}`;
}

const extensions = [
    {
        id: "aurora-meta",
        name: "Aurora Meta",
        zipFile: "aurora-meta.zip",
        status: "available",
        situationLabel: "Disponível",
        description:
            "Envie vários prompts para a Meta AI e receba o download automático das imagens geradas, já organizadas no seu computador.",
    },
    {
        id: "aurora-midjourney",
        name: "Aurora Midjourney",
        zipFile: "aurora-midjourney.zip",
        status: MIDJOURNEY_STATUS,
        situationLabel:
            MIDJOURNEY_STATUS === "updating" ? "Em atualização" : "Disponível",
        description:
            "Foco em enviar prompts: fluxo enxuto com o Midjourney no navegador, sem camadas extras de automação.",
        updatingNotice:
            "Em atualização: o download está desativado para evitar versões instáveis ou com bugs. Volte em breve.",
    },
];

export default function DownloadHero() {
    const [mobileNoticeOpen, setMobileNoticeOpen] = useState(false);

    useEffect(() => {
        if (!mobileNoticeOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setMobileNoticeOpen(false);
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [mobileNoticeOpen]);

    const handleDownload = useCallback((ext) => {
        if (ext.status === "updating") return;
        if (isBelowLargeViewport()) {
            setMobileNoticeOpen(true);
            return;
        }
        setMobileNoticeOpen(false);
        const url = extensionZipUrl(ext.zipFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = ext.zipFile;
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, []);

    return (
        <section className="px-4 pb-20 pt-8 sm:px-6 md:px-10 md:pt-12 lg:px-16 lg:pt-16 xl:px-24">
            <div className="mx-auto max-w-5xl">
                <header className="mx-auto max-w-2xl text-center">
                    <Tag label="Download" />
                    <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem] dark:text-neutral-50">
                        Escolha a extensão
                    </h1>
                   
                </header>

                <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:gap-8">
                    {extensions.map((ext) => {
                        const isUpdating = ext.status === "updating";
                        return (
                            <li key={ext.id}>
                                <article
                                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-neutral-900/3 transition-shadow duration-300 dark:border-neutral-800 dark:bg-neutral-950/70 dark:ring-white/4 ${
                                        isUpdating
                                            ? "pointer-events-none opacity-[0.52] saturate-[0.55]"
                                            : "hover:shadow-lg hover:shadow-neutral-200/60 dark:hover:shadow-black/40"
                                    }`}
                                    aria-disabled={isUpdating || undefined}
                                >
                                    <div
                                        className="h-1 w-full shrink-0"
                                        style={{
                                            background: isUpdating
                                                ? "linear-gradient(90deg, #a3a3a3 0%, #737373 100%)"
                                                : "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
                                        }}
                                        aria-hidden
                                    />
                                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                                                <FileArchive
                                                    className="h-5 w-5"
                                                    strokeWidth={1.75}
                                                />
                                            </div>
                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                                                    isUpdating
                                                        ? "bg-amber-500/20 text-amber-950 dark:bg-amber-500/15 dark:text-amber-200"
                                                        : "bg-emerald-500/15 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300"
                                                }`}
                                            >
                                                {ext.situationLabel}
                                            </span>
                                        </div>
                                        <h2 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                            {ext.name}
                                        </h2>
                                        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {ext.description}
                                        </p>
                                        {isUpdating && ext.updatingNotice ? (
                                            <div
                                                className="mt-4 flex gap-2 rounded-xl border border-amber-200/90 bg-amber-50 px-3 py-2.5 text-left text-xs leading-relaxed text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/35 dark:text-amber-100"
                                                role="status"
                                            >
                                                <AlertTriangle
                                                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                                                    strokeWidth={2}
                                                />
                                                <span>{ext.updatingNotice}</span>
                                            </div>
                                        ) : null}
                                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                            {isUpdating ? (
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500 sm:flex-1"
                                                >
                                                    Download indisponível
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDownload(ext)}
                                                    className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-linear-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 active:scale-[0.99] dark:shadow-black/30 sm:flex-1"
                                                >
                                                    <DownloadIcon className="h-4 w-4" />
                                                    Baixar .zip
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>

                <div
                    className={`mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left ${dashedPanel}`}
                >
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        Depois de baixar o ZIP, siga o guia de instalação para carregar a
                        extensão no Chrome sem problemas.
                    </p>
                    <Button
                        variant="secondary"
                        to="/documention"
                        label="Abrir documentação"
                        icon={<ArrowRight className="h-4 w-4" />}
                        className="shrink-0"
                    />
                </div>
            </div>

            {mobileNoticeOpen
                ? createPortal(
                      <div
                          className="fixed inset-0 z-200 flex items-end justify-center sm:items-center sm:p-4"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="mobile-download-title"
                          aria-describedby="mobile-download-desc"
                      >
                          <button
                              type="button"
                              className="absolute inset-0 bg-neutral-950/55 backdrop-blur-[2px]"
                              onClick={() => setMobileNoticeOpen(false)}
                              aria-label="Fechar"
                          />
                          <div className="relative z-10 w-full max-w-md rounded-t-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-2xl sm:shadow-xl">
                              <button
                                  type="button"
                                  className="absolute right-3 top-3 rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                                  onClick={() => setMobileNoticeOpen(false)}
                                  aria-label="Fechar"
                              >
                                  <X className="h-5 w-5" strokeWidth={2} />
                              </button>
                              <div className="flex flex-col items-center gap-4 pt-1 text-center sm:pt-0">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-300">
                                      <Monitor
                                          className="h-7 w-7"
                                          strokeWidth={1.75}
                                      />
                                  </div>
                                  <div className="space-y-2 px-1">
                                      <h2
                                          id="mobile-download-title"
                                          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
                                      >
                                          Use o computador para baixar
                                      </h2>
                                      <p
                                          id="mobile-download-desc"
                                          className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                                      >
                                          O arquivo .zip da extensão é pensado para instalar
                                          no Chrome no desktop. Abra esta página no seu PC ou
                                          Mac e toque em &quot;Baixar .zip&quot; de novo.
                                      </p>
                                  </div>
                                  <button
                                      type="button"
                                      onClick={() => setMobileNoticeOpen(false)}
                                      className="mt-2 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
                                  >
                                      Entendi
                                  </button>
                              </div>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </section>
    );
}
