import { useCallback, useState } from "react";
import Button from "../../components/Button";
import { DownloadIcon, Sparkles, FileArchive, ArrowRight } from "lucide-react";

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
        tag: "Meta AI",
        zipFile: "aurora-meta.zip",
        description:
            "Envie vários prompts para a Meta AI e receba o download automático das imagens geradas, já organizadas no seu computador.",
    },
    {
        id: "aurora-midjourney",
        name: "Aurora Midjourney",
        tag: "Midjourney",
        zipFile: "aurora-midjourney.zip",
        description:
            "Foco em enviar prompts: fluxo enxuto com o Midjourney no navegador, sem camadas extras de automação.",
    },
];

export default function DownloadHero() {
    const [mobileNotice, setMobileNotice] = useState(null);

    const handleDownload = useCallback((zipFile) => {
        if (isBelowLargeViewport()) {
            setMobileNotice(
                "Acesse pelo seu computador (tela grande) para baixar esta extensão."
            );
            return;
        }
        setMobileNotice(null);
        const url = extensionZipUrl(zipFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = zipFile;
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, []);

    return (
        <section className="px-4 pb-20 pt-8 sm:px-6 md:px-10 md:pt-12 lg:px-16 lg:pt-16 xl:px-24">
            <div className="mx-auto max-w-5xl">
                <header className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400">
                        <Sparkles className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                        Download
                    </div>
                    <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem] dark:text-neutral-50">
                        Escolha a extensão
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
                        Cada opção é um pacote .zip (JavaScript ofuscado). Extraia o arquivo e
                        carregue no Chrome em modo do desenvolvedor, seguindo o guia na
                        documentação. Download disponível em telas grandes (desktop).
                    </p>
                </header>

                {mobileNotice ? (
                    <div
                        className="mx-auto mt-8 max-w-xl rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
                        role="alert"
                        aria-live="polite"
                    >
                        {mobileNotice}
                    </div>
                ) : null}

                <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:gap-8">
                    {extensions.map((ext) => (
                        <li key={ext.id}>
                            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-neutral-900/3 transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-950/70 dark:ring-white/4 dark:hover:shadow-black/40">
                                <div
                                    className="h-1 w-full shrink-0"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
                                    }}
                                    aria-hidden
                                />
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                                            <FileArchive
                                                className="h-5 w-5"
                                                strokeWidth={1.75}
                                            />
                                        </div>
                                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                            {ext.tag}
                                        </span>
                                    </div>
                                    <h2 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                        {ext.name}
                                    </h2>
                                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {ext.description}
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDownload(ext.zipFile)}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-linear-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 active:scale-[0.99] dark:shadow-black/30 sm:flex-1"
                                        >
                                            <DownloadIcon className="h-4 w-4" />
                                            Baixar .zip
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
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
        </section>
    );
}
