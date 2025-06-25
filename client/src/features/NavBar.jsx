import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const links = [
        { name: "דף הבית", path: "/" },
        { name: "ספרים", path: "/books" },
        { name: "ספרים לקניה", path: "/booksNeeded" },
        { name: "תורמים", path: "/donors" },
        { name: "הודעות ופניות", path: "/messages" }
    ];

    return (
        <nav className="bg-gray-800 text-white p-3 flex gap-4">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1 rounded hover:bg-gray-700 ${location.pathname === link.path ? "bg-gray-700" : ""
                        }`}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}