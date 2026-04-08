import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-md dark:bg-neutral-950/90 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <div className="mx-auto max-w-7xl">
                <nav className="flex h-16 items-center justify-start sm:h-17">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-lg outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                        <div className="h-9 w-9 shrink-0">
                            <img
                                src={Logo}
                                alt="Logo Aurora"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <span className="inline-block bg-linear-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
                            Aurora
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
