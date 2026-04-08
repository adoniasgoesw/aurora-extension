/** Troque para `"available"` quando a build estiver pronta para download. */
export const MIDJOURNEY_STATUS = "updating";

/** Abaixo de `lg` (1024px) o download via botão mostra aviso para usar desktop. */
export function isBelowLargeViewport() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
}

export function extensionZipUrl(zipFile) {
    const base = import.meta.env.BASE_URL || "/";
    const root = base.endsWith("/") ? base.slice(0, -1) : base;
    return `${root}/extension/${zipFile}`;
}

export const extensions = [
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
        updatingNoteLines: [
            "Automatize o envio de prompts com a Aurora.",
            "Automatize seus prompts com a Aurora.",
        ],
    },
];
