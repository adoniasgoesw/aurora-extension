import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Tag from "../../components/Tag";
import Button from "../../components/Button";
import { DownloadIcon, Monitor, X } from "lucide-react";
import Logo from "../../assets/logo.png";
import {
    extensions,
    extensionZipUrl,
    isBelowLargeViewport,
} from "../../data/extensions";

export default function HomeHero() {
    const [selectedId, setSelectedId] = useState(null);
    const [desktopOnlyOpen, setDesktopOnlyOpen] = useState(false);
    const selected = extensions.find((e) => e.id === selectedId) ?? null;

    useEffect(() => {
        if (!desktopOnlyOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setDesktopOnlyOpen(false);
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [desktopOnlyOpen]);

    const handleDownload = useCallback(() => {
        if (!selected || selected.status === "updating") return;
        if (isBelowLargeViewport()) {
            setDesktopOnlyOpen(true);
            return;
        }
        setDesktopOnlyOpen(false);
        const url = extensionZipUrl(selected.zipFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = selected.zipFile;
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, [selected]);

    return (
        <section className="min-h-[calc(100dvh-4rem)] px-4 pb-16 pt-10 sm:px-6 md:px-10 md:pt-14 lg:px-16 lg:pt-16 xl:px-24">
            <div className="mx-auto flex max-w-3xl flex-col">
                <div className="mx-auto max-w-xl text-center">
                    <Tag label="Extensões Aurora" />
                    <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
                        Automatize o envio de prompts com a Aurora.
                    </h1>
                    
                    <p className="mt-4 text-pretty text-sm text-neutral-600 dark:text-neutral-400">
                        Escolha uma extensão abaixo e baixe o pacote para instalar no
                        Chrome no seu computador.
                    </p>
                </div>

                <ul className="mx-auto mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2 sm:gap-4">
                    {extensions.map((ext) => {
                        const isUpdating = ext.status === "updating";
                        const isSelected = selectedId === ext.id;
                        return (
                            <li key={ext.id}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedId(ext.id)}
                                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-[box-shadow,ring] duration-200 dark:bg-neutral-950/70 ${
                                        isSelected
                                            ? "border-cyan-500/80 ring-2 ring-cyan-500/35 dark:border-cyan-400/50"
                                            : "border-neutral-200/90 ring-1 ring-neutral-900/3 hover:border-neutral-300 hover:shadow dark:border-neutral-800 dark:ring-white/4 dark:hover:border-neutral-600"
                                    }`}
                                >
                                    <div
                                        className="h-0.5 w-full shrink-0"
                                        style={{
                                            background: isUpdating
                                                ? "linear-gradient(90deg, #a3a3a3 0%, #737373 100%)"
                                                : "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
                                        }}
                                        aria-hidden
                                    />
                                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                                                <img
                                                    src={Logo}
                                                    alt=""
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                                    isUpdating
                                                        ? "bg-amber-500/20 text-amber-950 dark:bg-amber-500/15 dark:text-amber-200"
                                                        : "bg-emerald-500/15 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300"
                                                }`}
                                            >
                                                {ext.situationLabel}
                                            </span>
                                        </div>
                                        <h2 className="mt-2.5 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                            {ext.name}
                                        </h2>
                                        <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {ext.description}
                                        </p>
                                        {isUpdating &&
                                        ext.updatingNoteLines?.length ? (
                                            <div
                                                className="mt-2.5 space-y-0.5 border-t border-neutral-100 pt-2.5 text-[11px] leading-snug text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                                                role="status"
                                            >
                                                {ext.updatingNoteLines.map(
                                                    (line) => (
                                                        <p key={line}>
                                                            {line}
                                                        </p>
                                                    ),
                                                )}
                                            </div>
                                        ) : null}
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="mx-auto mt-8 flex min-h-14 w-full max-w-sm flex-col items-center justify-center">
                    {selected ? (
                        selected.status === "updating" ? (
                            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                                Esta variante ainda não pode ser baixada.
                            </p>
                        ) : (
                            <Button
                                variant="primary"
                                icon={<DownloadIcon />}
                                label="Baixar extensão"
                                onClick={handleDownload}
                            />
                        )
                    ) : (
                        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                            Selecione uma extensão para habilitar o download.
                        </p>
                    )}
                </div>
            </div>

            {desktopOnlyOpen
                ? createPortal(
                      <div
                          className="fixed inset-0 z-200 flex items-end justify-center sm:items-center sm:p-4"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="desktop-only-title"
                          aria-describedby="desktop-only-desc"
                      >
                          <button
                              type="button"
                              className="absolute inset-0 bg-neutral-950/55 backdrop-blur-[2px]"
                              onClick={() => setDesktopOnlyOpen(false)}
                              aria-label="Fechar"
                          />
                          <div className="relative z-10 w-full max-w-md rounded-t-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-2xl sm:shadow-xl">
                              <button
                                  type="button"
                                  className="absolute right-3 top-3 rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                                  onClick={() => setDesktopOnlyOpen(false)}
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
                                          id="desktop-only-title"
                                          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
                                      >
                                          Acesse pelo computador
                                      </h2>
                                      <p
                                          id="desktop-only-desc"
                                          className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                                      >
                                          A Aurora é uma extensão para o Chrome no
                                          desktop. Abra este site no seu PC ou Mac para
                                          escolher e baixar a extensão.
                                      </p>
                                  </div>
                                  <button
                                      type="button"
                                      onClick={() => setDesktopOnlyOpen(false)}
                                      className="mt-1 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
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
