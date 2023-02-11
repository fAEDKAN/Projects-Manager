import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const ProtectedLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return (
            <main className="bg-no-repeat bg-cover bg-center flex justify-center items-center">
                <div className="loader">
                    <div className="circle"></div>
                </div>
            </main>
        );
    }

    return (
        <>
            {/* si el usuario no está autorizado, se redirecciona al Login */}
            {auth._id ? (
                <div className="bg-transparent">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="bg-no-repeat bg-cover bg-center flex justify-center items-center flex-col">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};
