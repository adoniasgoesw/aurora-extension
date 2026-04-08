import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../sections/Navbar";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="pt-16 sm:pt-17">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
