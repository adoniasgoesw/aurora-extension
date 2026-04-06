/**
 * Pill de seção — texto só, fundo cinza neutro.
 * @param {string} label
 * @param {string} [className]
 */
export default function Tag({ label, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 ${className}`.trim()}
        >
            {label}
        </span>
    );
}
