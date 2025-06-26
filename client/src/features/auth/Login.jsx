import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { setToken } from "./authSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { Message } from "primereact/message";

const Login = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [LoginFunc, { isError, error, isSuccess, data, isLoading }] = useLoginMutation()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        if (isSuccess && data?.accessToken) {
            dispatch(setToken({ 
                token: data.accessToken, 
                username: data.user?.username || formData.username,
                name: data.user?.name || formData.username
            }));
            if (onSuccess) onSuccess();
        }
    }, [isSuccess, data, dispatch, formData.username, onSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginFunc(formData)
    }

    return (
        <div className="login-container" style={{ padding: '1rem' }}>
            <h2>התחברות</h2>
            <form onSubmit={handleSubmit} className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isError && (
                    <Message 
                        severity="error" 
                        text={error?.data?.message || "שגיאה בהתחברות"} 
                        style={{ marginBottom: '1rem' }}
                    />
                )}
                
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
                
                <Button 
                    type="submit" 
                    label="התחבר" 
                    loading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    )
}

export default Login