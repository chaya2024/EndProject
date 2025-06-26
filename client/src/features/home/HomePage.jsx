import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../auth/authSlice";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isUserLoggedIn, username, name } = useSelector(state => state.auth);
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogout = () => {
        dispatch(removeToken());
        alert("התנתקת בהצלחה");
    };

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        alert("התחברת בהצלחה");
    };

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    const modules = [
        { name: "ספרים", path: "/books", color: "bg-green-100", border: "border-green-500" },
        { name: "ספרים לקניה", path: "/booksNeeded", color: "bg-blue-100", border: "border-blue-500" },
        { name: "תורמים", path: "/donors", color: "bg-purple-100", border: "border-purple-500" },
        { name: "הודעות ופניות", path: "/messages", color: "bg-orange-100", border: "border-orange-500" }
    ];
    
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

            <Dialog 
                header="הרשמה" 
                visible={showRegisterModal} 
                onHide={() => setShowRegisterModal(false)} 
                modal 
                style={{ width: '400px' }}
            >
                <Register onSuccess={handleRegisterSuccess} />
            </Dialog>

            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">ניהול המערכת</h1>

                <div className="flex justify-center mb-6 gap-4">
                    {!isUserLoggedIn ? (
                        <>
                            <Button
                                label="התחברות"
                                icon="pi pi-sign-in"
                                className="p-button-info"
                                onClick={() => setShowLoginModal(true)}
                            />
                            <Button
                                label="הרשמה"
                                icon="pi pi-user-plus"
                                className="p-button-success"
                                onClick={() => setShowRegisterModal(true)}
                            />
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                                שלום, {name || username}!
                            </span>
                            <Button
                                label="התנתקות"
                                icon="pi pi-sign-out"
                                className="p-button-danger"
                                onClick={handleLogout}
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((mod) => (
                        <div
                            key={mod.path}
                            className={`cursor-pointer ${mod.color} ${mod.border} border-2 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300`}
                            onClick={() => navigate(mod.path)}
                        >
                            <h2 className="text-xl font-semibold">{mod.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}