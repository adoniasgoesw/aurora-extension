import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Início", href: "/" },
    { label: "Download", href: "/download" },
    { label: "Documentação", href: "/documention" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <header className="fixed top-0 left-0 z-50 w-full  backdrop-blur-md dark:bg-neutral-950/85 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <div className="mx-auto max-w-7xl ">
                <nav className="flex h-16 items-center justify-between sm:h-17">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-lg outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                        <div className="h-9 w-9 shrink-0 sm:h-10 sm:w-10">
                            <img
                                src={Logo}
                                alt="Logo Aurora"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
                            Aurora
                        </span>
                    </Link>

                    <ul className="hidden items-center gap-1 md:flex md:gap-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        location.pathname === item.href
                                            ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 p-2.5 text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-800 md:hidden"
                        onClick={() => setIsOpen((open) => !open)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav"
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {isOpen ? (
                            <X className="h-5 w-5" strokeWidth={2} />
                        ) : (
                            <Menu className="h-5 w-5" strokeWidth={2} />
                        )}
                    </button>
                </nav>
            </div>

            {isOpen ? (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 top-16 z-40 bg-transparent sm:top-17 md:hidden"
                        aria-hidden
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        id="mobile-nav"
                        className="relative z-50 px-4 py-4 sm:px-6 md:hidden"
                    >
                        <nav
                            className="mx-auto max-w-7xl rounded-2xl bg-white p-2 border border-neutral-200 "
                            aria-label="Menu de navegação"
                        >
                            <ul className="flex flex-col gap-1">
                                {navItems.map((item) => {
                                    const active = location.pathname === item.href;
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                to={item.href}
                                                className={`block rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors ${
                                                    active
                                                        ? "bg-linear-to-r from-cyan-500/15 to-violet-500/15 text-neutral-900 dark:text-white"
                                                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 "
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </>
            ) : null}
        </header>
    );
}
