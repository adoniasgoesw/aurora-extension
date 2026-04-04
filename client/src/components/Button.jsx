import { Link } from "react-router-dom";

const variantClasses = {
  neon:
    "border-2 border-cyan-400/90 bg-slate-950 text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.28),inset_0_0_20px_rgba(34,211,238,0.06)] hover:border-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.45)]",
  primary: "text-white hover:opacity-90",
  outline:
    "border border-neutral-400 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800",
  secondary:
    "border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 dark:border-neutral-200 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
};

const primaryGradient = {
  background:
    "linear-gradient(135deg, #22d3ee 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%)",
};

export default function Button({
  label,
  onClick,
  icon,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  style,
  to,
  ...rest
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 sm:w-auto";

  const v = variantClasses[variant] ?? variantClasses.primary;
  const mergedStyle =
    variant === "primary" ? { ...primaryGradient, ...style } : style;

  const combinedClassName = `${base} ${v} ${className}`.trim();

  const content = (
    <>
      {icon ? (
        <span className="shrink-0 [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      ) : null}
      {label}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClassName}
        style={mergedStyle}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      style={mergedStyle}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}
