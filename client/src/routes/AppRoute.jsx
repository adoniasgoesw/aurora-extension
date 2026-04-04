import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Download from "../pages/Download";
import Documention from "../pages/Documention";
import Navbar from "../sections/Navbar";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="pt-16 sm:pt-17">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/documention" element={<Documention />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}