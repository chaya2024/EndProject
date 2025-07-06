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
    return (
  <>
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
      <div className="flex justify-center mb-6 gap-4">
        {isUserLoggedIn && (
          <Button
            label="רישום לצוות הספריה"
            icon="pi pi-user-plus"
            className="p-button-success"
            onClick={() => setShowRegisterModal(true)}
          />
        )}
      </div>
    </div>
  </>
);
}

