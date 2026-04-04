import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { ArrowRight } from "lucide-react";

function Code({ children }) {
    return (
        <code className="rounded-md bg-neutral-200/60 px-1.5 py-0.5 font-mono text-[0.8125rem] font-medium text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200">
            {children}
        </code>
    );
}

const steps = [
    {
        step: 1,
        title: "Baixe a extensão",
        description: (
            <>
                Na página de{" "}
                <Link
                    to="/download"
                    className="font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-2 transition-colors hover:decoration-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
                >
                    Download
                </Link>
                , escolha a variante Aurora (Meta ou Midjourney) e salve o arquivo{" "}
                <Code>.zip</Code> em um lugar fácil de encontrar.
            </>
        ),
    },
    {
        step: 2,
        title: "Extraia o arquivo",
        description: (
            <>
                No gerenciador de arquivos, extraia todo o ZIP para uma pasta vazia. No
                passo final você vai selecionar essa pasta — confira se existe o arquivo{" "}
                <Code>manifest.json</Code> dentro dela.
            </>
        ),
    },
    {
        step: 3,
        title: "Abra as extensões do Chrome",
        description: (
            <>
                No Chrome, use o menu ⋮ →{" "}
                <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Extensões
                </strong>{" "}
                →{" "}
                <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Gerenciar extensões
                </strong>
                . Atalho: digite <Code>chrome://extensions</Code> na barra de endereços e
                pressione Enter.
            </>
        ),
    },
    {
        step: 4,
        title: "Ative o modo do desenvolvedor",
        description: (
            <>
                No canto superior direito da página, ative o{" "}
                <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Modo do desenvolvedor
                </strong>
                . Isso é necessário para carregar extensões descompactadas.
            </>
        ),
    },
    {
        step: 5,
        title: "Carregar sem compactação",
        description: (
            <>
                Clique em{" "}
                <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Carregar sem compactação
                </strong>{" "}
                (<Code>Load unpacked</Code>) e escolha a pasta que você extraiu — aquela
                que tem o <Code>manifest.json</Code> na raiz, não uma subpasta vazia.
            </>
        ),
    },
    {
        step: 6,
        title: "Confirme e fixe na barra",
        description:
            "A Aurora deve aparecer na lista sem erros. Se quiser, fixe o ícone ao lado da URL para abrir o fluxo criativo com um clique.",
    },
];

export default function DocumentionHero() {
    return (
        <section className="px-4 pb-24 pt-8 sm:px-6 md:px-10 md:pt-12 lg:px-16 lg:pt-16 xl:px-24">
            <div className="mx-auto max-w-7xl text-left">
                <header className="border-b border-neutral-200/90 pb-10 dark:border-neutral-800/90">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                        Documentação
                    </p>
                    <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-[2.125rem] sm:leading-tight dark:text-neutral-50">
                        Instalação da extensão Aurora
                    </h1>
                    <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-[1.65] text-neutral-600 dark:text-neutral-400">
                        Passo a passo para instalar manualmente a partir do pacote ZIP, sem
                        usar a Chrome Web Store.
                    </p>
                    <Button
                        variant="secondary"
                        to="/download"
                        label="Ir para Download"
                        icon={<ArrowRight className="h-4 w-4" />}
                        className="mt-8 shrink-0"
                    />
                </header>

                <div className="mt-14">
                    <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                        Passos
                    </p>
                    <ol className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {steps.map(({ step, title, description }) => (
                            <li key={step} className="min-w-0">
                                <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-neutral-900/3 transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-950/70 dark:ring-white/4 dark:hover:shadow-black/40">
                                    <div
                                        className="h-1 w-full shrink-0"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
                                        }}
                                        aria-hidden
                                    />
                                    <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-7">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-sm font-semibold tabular-nums text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
                                                {String(step).padStart(2, "0")}
                                            </div>
                                            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                Passo {step}
                                            </span>
                                        </div>
                                        <h2 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                            {title}
                                        </h2>
                                        <div className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {typeof description === "string" ? (
                                                <p>{description}</p>
                                            ) : (
                                                description
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
