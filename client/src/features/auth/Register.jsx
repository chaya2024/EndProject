import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const Register = ({ onSuccess }) => {
    const [RegisterFunc, { isError, error, isSuccess, data, isLoading }] = useRegisterMutation()
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (isSuccess) {
            alert("נרשמת בהצלחה! כעת תוכל להתחבר");
            setFormData({
                name: "",
                username: "",
                password: "",
                email: "",
                phone: ""
            });
            if (onSuccess) onSuccess();
        }
    }, [isSuccess, onSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RegisterFunc(formData)
    }

    return (
        <div className="register-container" style={{ padding: '1rem' }}>
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit} className="register-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isError && (
                    <Message 
                        severity="error" 
                        text={error?.data?.message || "שגיאה בהרשמה"} 
                        style={{ marginBottom: '1rem' }}
                    />
                )}
                
                <div className="form-group">
                    <label htmlFor="name">שם מלא:</label>
                    <InputText
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="username">שם משתמש:</label>
                    <InputText
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">סיסמה:</label>
                    <InputText
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">אימייל (אופציונלי):</label>
                    <InputText
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">טלפון (אופציונלי):</label>
                    <InputText
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>
                
                <Button 
                    type="submit" 
                    label="הירשם" 
                    loading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    )
}

export default Register