import { PanelRight, SquarePen, Search, SquarePlay, Wand } from "lucide-react";

function NeonCircleRing() {
    return (
        <div
            className="h-8 w-8 shrink-0 rounded-full p-[2.5px] shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            style={{
                background:
                    "conic-gradient(from 210deg, #22d3ee, #06b6d4, #6366f1, #8b5cf6, #ec4899, #22d3ee)",
            }}
            aria-hidden
        >
            <div className="h-full w-full rounded-full bg-white dark:bg-neutral-950" />
        </div>
    );
}

const menuItems = [
    {
        icon: SquarePen,
        label: "Nova conversa",
        shortcut: "Ctrl+Shift+O",
    },
    {
        icon: Search,
        label: "Pesquisar",
        shortcut: "Ctrl+K",
    },
    {
        icon: SquarePlay,
        label: "Vibes",
        shortcut: null,
    },
    {
        icon: Wand,
        label: "Criar",
        shortcut: null,
    },
];

const historyItems = [
    {
        id: 1,
        title:
            "Paisagem alienígena cinematográfica no pôr do sol, duas luas, névoa volumétrica e céu brilhante",
    },
    {
        id: 2,
        title:
            "Foto de produto minimalista — fones pretos foscos sobre mármore, luz de estúdio suave",
    },
    {
        id: 3,
        title:
            "Retrato editorial, luz de contorno quente, profundidade de campo rasa, grão de filme sutil",
    },
];

export default function Meta() {
    return (
        <article className="relative z-0 h-[500px] w-full rounded-3xl border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-950">
            <div className="flex h-full w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                <aside className="flex h-full w-[min(100%,280px)] shrink-0 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex shrink-0 items-center justify-between px-2 py-3">
                        <NeonCircleRing />
                        <button
                            type="button"
                            className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                            aria-label="Alternar painel"
                        >
                            <PanelRight className="h-5 w-5" strokeWidth={1.75} />
                        </button>
                    </div>

                    <nav className="shrink-0 space-y-0.5 px-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/80"
                                >
                                    <Icon
                                        className="h-[18px] w-[18px] shrink-0 text-neutral-700 dark:text-neutral-300"
                                        strokeWidth={1.75}
                                    />
                                    <span className="min-w-0 flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                                        {item.label}
                                    </span>
                                    {item.shortcut ? (
                                        <span className="shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                                            {item.shortcut}
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-4 flex min-h-0 flex-1 flex-col border-t border-neutral-100 pt-4 dark:border-neutral-800">
                        <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                            Histórico
                        </p>
                        <ul className="mt-3 flex flex-col gap-1 overflow-y-auto px-1 pb-2">
                            {historyItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        className="w-full rounded-lg px-2 py-2 text-left text-xs leading-snug text-neutral-600 transition-colors hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900/80"
                                    >
                                        <span className="line-clamp-2">{item.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col bg-neutral-50/80 dark:bg-neutral-900/50">
                    <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <h1 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            Meta
                        </h1>
                    </div>
                </div>
            </div>
        </article>
    );
}
