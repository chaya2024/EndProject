import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./auth/authSlice";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import {
  FaHome,
  FaBook,
  FaShoppingCart,
  FaHandsHelping,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUserLoggedIn, username, name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(removeToken());
    alert("התנתקת בהצלחה");
  };

  const links = [
    { name: "דף הבית", path: "/", icon: <FaHome /> },
    { name: "ספרים", path: "/books", icon: <FaBook /> },
    { name: "ספרים לקניה", path: "/booksNeeded", icon: <FaShoppingCart /> },
    { name: "תורמים", path: "/donors", icon: <FaHandsHelping /> },
    { name: "הודעות ופניות", path: "/messages", icon: <FaEnvelope /> },
  ];

  return (
    <>
      <Tooltip target=".nav-link" position="bottom" />

      {/* נב עליון מודרני */}
      <nav className="bg-gray-50 border border-gray-200 rounded-md shadow-sm px-4 py-3 mx-auto mt-4 max-w-6xl">
        <div className="flex justify-between items-center">

          {/* קישורים */}
          <ul className="flex gap-4 items-center text-gray-700 font-medium text-sm" dir="rtl">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200
                      ${isActive ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100"}
                    `}
                    style={{ fontWeight: isActive ? "600" : "500" }}
                    data-pr-tooltip={link.name}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* אזור משתמש */}
          {isUserLoggedIn && (
            <div className="flex items-center gap-3" dir="rtl">
              <span className="text-sm whitespace-nowrap">שלום, {name || username}</span>
              <Button
                icon="pi pi-sign-out"
                className="p-button-sm p-button-rounded p-button-danger p-button-outlined"
                onClick={handleLogout}
                tooltip="התנתקות"
                tooltipOptions={{ position: "bottom" }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* תוכן הדף שלך יבוא כאן */}
      <main className="max-w-6xl mx-auto px-4 mt-6 mb-20">
        {/* כאן יבוא תוכן כמו טבלה / רשימות וכו׳ */}
      </main>

      {/* פוטר רגיל בתחתית הדף */}
      <footer className="w-full border-t border-gray-200 text-center text-gray-400 text-sm py-3 select-none tracking-wide font-light">
        ספריית מתן נחליאל &copy; {new Date().getFullYear()}
      </footer>
    </>
  );
}
