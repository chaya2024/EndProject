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
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ספרייה
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`group relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                    location.pathname === link.path
                                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                                }`}
                            >
                                <i className={`${link.icon} ml-2 text-base transition-transform duration-300 group-hover:scale-110`}></i>
                                <span className="relative">
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/50 rounded-full"></div>
                                    )}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        {isUserLoggedIn ? (
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-50 rounded-full px-4 py-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <i className="pi pi-user text-white text-sm"></i>
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">
                                        {name || username}
                                    </span>
                                </div>
                                <Button
                                    icon="pi pi-sign-out"
                                    className="p-button-rounded p-button-text hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                                    onClick={handleLogout}
                                    tooltip="התנתקות"
                                    tooltipOptions={{ position: 'bottom' }}
                                    style={{
                                        color: '#6b7280',
                                        width: '40px',
                                        height: '40px'
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm">
                                לא מחובר
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-300"
                        >
                            <i className={`pi ${isMobileMenuOpen ? 'pi-times' : 'pi-bars'} text-xl transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {links.map((link, index) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`group flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                                    location.pathname === link.path
                                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                                }`}
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <i className={`${link.icon} ml-3 text-lg transition-transform duration-300 group-hover:scale-110`}></i>
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        
                        {/* Mobile User Section */}
                        {isUserLoggedIn && (
                            <div className="border-t border-gray-200/50 pt-3 mt-3">
                                <div className="space-y-2">
                                    <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ml-3">
                                            <i className="pi pi-user text-white"></i>
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {name || username}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <i className="pi pi-sign-out ml-3 text-lg"></i>
                                        התנתקות
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}