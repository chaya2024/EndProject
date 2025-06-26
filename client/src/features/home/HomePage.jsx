import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: "", password: "" });

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "http://localhost:1234/auth/login" : "http://localhost:1234/auth/register";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.username, password: formData.password })
            });

            if (res.ok) {
                if (isLogin) {
                    const data = await res.json();
                    setUser(data.username || formData.username);
                    localStorage.setItem("user", data.username || formData.username);
                    alert("התחברת בהצלחה");
                } else {
                    alert("נרשמת בהצלחה, כעת התחבר");
                    setIsLogin(true);
                }
                setShowModal(false);
                setFormData({ username: "", password: "" });
            } else {
                const errorData = await res.json();
                alert("פעולה נכשלה: " + (errorData.message || "שגיאה לא ידועה"));
            }
        } catch (err) {
            console.error(err);
            alert("שגיאה בשרת");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        alert("התנתקת");
    };

    const modules = [
        { name: "ספרים", path: "/books", color: "bg-green-100", border: "border-green-500" },
        { name: "ספרים לקניה", path: "/booksNeeded", color: "bg-blue-100", border: "border-blue-500" },
        { name: "תורמים", path: "/donors", color: "bg-purple-100", border: "border-purple-500" },
        { name: "הודעות ופניות", path: "/messages", color: "bg-orange-100", border: "border-orange-500" }
    ];
    
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">ניהול המערכת</h1>

            <div className="flex justify-center mb-6 gap-4">
                {!user ? (
                    <>
                        <button
                            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                            onClick={() => { setIsLogin(true); setShowModal(true); }}
                        >
                            התחברות
                        </button>
                        <button
                            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
                            onClick={() => { setIsLogin(false); setShowModal(true); }}
                        >
                            הרשמה
                        </button>
                    </>
                ) : (
                    <>
                        <span className="text-lg">שלום, {user}!</span>
                        <button
                            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            התנתקות
                        </button>
                    </>
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

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "התחברות" : "הרשמה"}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="שם משתמש"
                                className="border p-2 rounded"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="סיסמה"
                                className="border p-2 rounded"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                            >
                                {isLogin ? "התחבר" : "הירשם"}
                            </button>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700 text-sm mt-2"
                                onClick={() => setShowModal(false)}
                            >
                                ביטול
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}