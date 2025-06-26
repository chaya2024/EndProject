import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./auth/authSlice";
import { Button } from "primereact/button";

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isUserLoggedIn, username, name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(removeToken());
        alert("התנתקת בהצלחה");
    };

    const links = [
        { name: "דף הבית", path: "/" },
        { name: "ספרים", path: "/books" },
        { name: "ספרים לקניה", path: "/booksNeeded" },
        { name: "תורמים", path: "/donors" },
        { name: "הודעות ופניות", path: "/messages" }
    ];

    return (
        <nav className="bg-gray-800 text-white p-3 flex justify-between items-center">
            <div className="flex gap-4">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`px-3 py-1 rounded hover:bg-gray-700 ${
                            location.pathname === link.path ? "bg-gray-700" : ""
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            
            {isUserLoggedIn && (
                <div className="flex items-center gap-3">
                    <span className="text-sm">
                        שלום, {name || username}
                    </span>
                    <Button
                        icon="pi pi-sign-out"
                        className="p-button-sm p-button-danger"
                        onClick={handleLogout}
                        tooltip="התנתקות"
                        tooltipOptions={{ position: 'bottom' }}
                    />
                </div>
            )}
        </nav>
    );
}