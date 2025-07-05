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
        { name: "דף הבית", path: "/", icon: "pi pi-home" },
        { name: "ספרים", path: "/books", icon: "pi pi-star" },
        { name: "ספרים לקניה", path: "/booksNeeded", icon: "pi pi-search" },
        { name: "תורמים", path: "/donors", icon: "pi pi-envelope" },
        { name: "הודעות ופניות", path: "/messages", icon: "pi pi-envelope" }
    ];

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-center items-center h-16">
                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`group flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    location.pathname === link.path
                                        ? "text-gray-900 bg-gray-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                <i className={`${link.icon} ml-2 text-sm`}></i>
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* User Section in Desktop */}
                        {isUserLoggedIn && (
                            <div className="flex items-center space-x-3 rtl:space-x-reverse border-r border-gray-200 pr-6 mr-6">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-gray-700 text-sm font-medium">
                                        {name || username}
                                    </span>
                                    <i className="pi pi-user text-gray-500 text-sm"></i>
                                </div>
                                <Button
                                    icon="pi pi-sign-out"
                                    className="p-button-sm p-button-text"
                                    onClick={handleLogout}
                                    tooltip="התנתקות"
                                    tooltipOptions={{ position: 'bottom' }}
                                    style={{
                                        color: '#6b7280',
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        <div className="text-gray-900 font-semibold">מערכת ניהול</div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none transition-colors duration-200"
                        >
                            <i className={`pi ${isMobileMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                        </button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`group flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                                    location.pathname === link.path
                                        ? "text-gray-900 bg-gray-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                <i className={`${link.icon} ml-3 text-sm`}></i>
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Mobile User Section */}
                        {isUserLoggedIn && (
                            <div className="border-t border-gray-100 pt-3 mt-3">
                                <div className="space-y-2">
                                    <div className="flex items-center px-3 py-2 text-gray-700">
                                        <i className="pi pi-user ml-3 text-sm"></i>
                                        <span className="text-sm font-medium">
                                            {name || username}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                    >
                                        <i className="pi pi-sign-out ml-3 text-sm"></i>
                                        התנתקות
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
