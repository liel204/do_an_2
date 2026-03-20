import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import { HomePage } from "./Layout/Page/Home";
import { DetailProductPage } from "./Layout/Page/DetailProduct";
import { CartProduct } from "./Layout/Page/Cart";
import { OderProduct } from "./Layout/Page/Order";
import { Caterogy } from "./Layout/Page/Category";
import { SignupPage } from "./Layout/Page/User/SignUp";
import { CheckOut } from "./Layout/Page/CheckOut";
import { LoginPage } from "./Layout/Page/User/Login";
import { Profile } from "./Layout/Page/User/Profile";
import AdminProduct from "./Layout/Admin/Index";
import ForgotPass from "./Layout/Page/User/Login/Components/ForgotPassword";
import BoxChat from "./Layout/Componemt/BoxChat";
import ChatWidget from "./Layout/Componemt/Chatbot/ChatWidget";

import { SocketProvider } from "./SocketProvider/SocketContext";

const ProtectedRoute = ({ children, adminRoute = false }) => {
    const checkLogin = localStorage.getItem("token");

    if (!checkLogin) {
        return <Navigate to="/login" />;
    }

    if (adminRoute) {
        const userRole = jwtDecode(checkLogin).User_Role;
        if (userRole !== "Admin" && userRole !== "Staff") {
            return <Navigate to="/" />;
        }
    }

    return children;
};

const AppContent = () => {
    const checkLogin = localStorage.getItem("token");
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <>
            {checkLogin && !isAdminRoute && (
                <BoxChat UserID={jwtDecode(checkLogin).id} />
            )}

            {!isAdminRoute && <ChatWidget />}

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/detail/:id"
                    element={<DetailProductPage />}
                />
                <Route
                    path="/cart"
                    element={checkLogin ? <CartProduct /> : <Navigate to="/login" />}
                />
                <Route
                    path="/oder"
                    element={checkLogin ? <OderProduct /> : <Navigate to="/login" />}
                />
                <Route
                    path="/category/:id"
                    element={<Caterogy />}
                />
                <Route
                    path="/signup"
                    element={checkLogin ? <Navigate to="/" /> : <SignupPage />}
                />
                <Route
                    path="/checkout"
                    element={checkLogin ? <CheckOut /> : <Navigate to="/login" />}
                />
                <Route
                    path="/profile"
                    element={checkLogin ? <Profile /> : <Navigate to="/login" />}
                />
                <Route path="/forgotPassword" element={<ForgotPass />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminRoute={true}>
                            <AdminProduct />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <SocketProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </SocketProvider>
    );
};

export default App;
