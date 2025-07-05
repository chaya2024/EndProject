import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./auth/authSlice";
import { Button } from "primereact/button";

export default function Navbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isUserLoggedIn, username, name } = useSelector(state => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(removeToken());
        alert("התנתקת בהצלחה");
    };

    const links = [
        { name: "דף הבית", path: "/", icon: "pi pi-home" },
        { name: "ספרים", path: "/books", icon: "pi pi-book" },
        { name: "ספרים לקניה", path: "/booksNeeded", icon: "pi pi-shopping-cart" },
        { name: "תורמים", path: "/donors", icon: "pi pi-users" },
        { name: "הודעות ופניות", path: "/messages", icon: "pi pi-envelope" }
    ];

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg border-b border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <i className="pi pi-book text-white text-sm"></i>
                                </div>
                                <span className="text-white font-bold text-lg hidden sm:block">מערכת ניהול ספרייה</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4 rtl:space-x-reverse">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        location.pathname === link.path
                                            ? "bg-slate-600 text-white shadow-md"
                                            : "text-slate-300 hover:bg-slate-600 hover:text-white"
                                    }`}
                                >
                                    <i className={`${link.icon} ml-2 text-sm`}></i>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        {isUserLoggedIn ? (
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-600 px-3 py-1 rounded-full">
                                    <i className="pi pi-user text-slate-300 text-sm"></i>
                                    <span className="text-slate-200 text-sm font-medium">
                                        {name || username}
                                    </span>
                                </div>
                                <Button
                                    icon="pi pi-sign-out"
                                    className="p-button-sm p-button-danger"
                                    onClick={handleLogout}
                                    tooltip="התנתקות"
                                    tooltipOptions={{ position: 'bottom' }}
                                    style={{
                                        backgroundColor: '#ef4444',
                                        borderColor: '#ef4444',
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-slate-300 text-sm">אורח</span>
                                <i className="pi pi-user text-slate-400"></i>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
                        >
                            <i className={`pi ${isMobileMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-700 border-t border-slate-600">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`group flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                                    location.pathname === link.path
                                        ? "bg-slate-600 text-white shadow-md"
                                        : "text-slate-300 hover:bg-slate-600 hover:text-white"
                                }`}
                            >
                                <i className={`${link.icon} ml-3 text-sm`}></i>
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Mobile User Section */}
                        <div className="border-t border-slate-600 pt-3 mt-3">
                            {isUserLoggedIn ? (
                                <div className="space-y-2">
                                    <div className="flex items-center px-3 py-2 text-slate-200">
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
                                        className="flex items-center w-full px-3 py-2 text-slate-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
                                    >
                                        <i className="pi pi-sign-out ml-3 text-sm"></i>
                                        התנתקות
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center px-3 py-2 text-slate-300">
                                    <i className="pi pi-user ml-3 text-sm"></i>
                                    <span className="text-sm">אורח</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}