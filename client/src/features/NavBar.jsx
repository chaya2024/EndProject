import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./auth/authSlice";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Menubar } from "primereact/menubar";
import {
    FaHome,
    FaBook,
    FaShoppingCart,
    FaHandsHelping,
    FaEnvelope,
} from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import Login from "./auth/Login";

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { isUserLoggedIn, username, name } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(removeToken());
        alert("התנתקת בהצלחה");
    };
    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        alert("התחברת בהצלחה");
    };

    // נייצר פריטים ל-Menubar עם אייקונים וקישורים מותאמים
    const items = [
        {
            label: "דף הבית",
            icon: <FaHome style={{ marginRight: 8 }} />,
            command: () => window.history.pushState(null, "", "/"),
            url: "/",
        },
        {
            label: "ספרים",
            icon: <FaBook style={{ marginRight: 8 }} />,
            command: () => window.history.pushState(null, "", "/books"),
            url: "/books",
        },
        {
            label: "ספרים לקניה",
            icon: <FaShoppingCart style={{ marginRight: 8 }} />,
            command: () => window.history.pushState(null, "", "/booksNeeded"),
            url: "/booksNeeded",
        },
        {
            label: "תורמים",
            icon: <FaHandsHelping style={{ marginRight: 8 }} />,
            command: () => window.history.pushState(null, "", "/donors"),
            url: "/donors",
        },
        {
            label: "הודעות ופניות",
            icon: <FaEnvelope style={{ marginRight: 8 }} />,
            command: () => window.history.pushState(null, "", "/messages"),
            url: "/messages",
        },
    ];

    // ניתן להוסיף כאן הוספת className שיבהיר מי פעיל
    const isActive = (url) => location.pathname === url;

    // Override של הרינדור של הפריט כדי להשתמש ב-Link ולהדגיש את הקישור הפעיל
    const startTemplate = (
        <div style={{ fontWeight: "bold", fontSize: 20, marginRight: 12 }}>
            ספריית מתן נחליאל
        </div>
    );

    const endTemplate = isUserLoggedIn ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>שלום, {name || username}</span>
            <Button
                icon="pi pi-sign-out"
                className="p-button-sm p-button-rounded p-button-danger p-button-outlined"
                onClick={handleLogout}
                tooltip="התנתקות"
            />
        </div>
    ) : (
        <Button
            label="התחבר"
            icon="pi pi-sign-in"
            className="p-button-sm p-button-rounded p-button-success"
            onClick={() => setShowLoginModal(true)}
        />
    );

    return (
        <>
            <Dialog
                header="התחברות"
                visible={showLoginModal}
                onHide={() => setShowLoginModal(false)}
                modal
                style={{ width: '400px' }}
            >
                <Login onSuccess={handleLoginSuccess} />
            </Dialog>
            <Tooltip target=".p-menuitem-link" position="bottom" />

            {/* עטיפת ה-Menubar בקונטיינר שמרכז אותו */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Menubar
                    model={items.map((item) => ({
                        ...item,
                        template: (itemProps, options) => {
                            return (
                                <Link
                                    to={item.url}
                                    className={`p-menuitem-link ${isActive(item.url) ? "active-link" : ""
                                        }`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontWeight: isActive(item.url) ? "bold" : "normal",
                                        backgroundColor: isActive(item.url) ? "#e0e0e0" : "transparent",
                                        borderRadius: 4,
                                        padding: "0.5rem 1rem",
                                        textDecoration: "none",
                                        color: isActive(item.url) ? "#333" : "#555",
                                    }}
                                    aria-current={isActive(item.url) ? "page" : undefined}
                                    data-pr-tooltip={item.label}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            );
                        },
                    }))}
                    start={startTemplate}
                    end={endTemplate}
                    className="p-menubar"
                    style={{ direction: "rtl", padding: "0.5rem 1rem", maxWidth: 1100 }}
                />
            </div>

            {/* תוכן הדף */}
            <main style={{ maxWidth: 960, margin: "2rem auto", padding: "0 1rem" }}>
                {/* תוכן דינמי */}
            </main>
        </>
    );
}
