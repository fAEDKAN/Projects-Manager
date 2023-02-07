import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { auth, loading } = useAuth();
    console.log(auth);

    {
        if (loading) {
            return <p>Cargando...</p>;
        }
    }

    return (
        <>
            {/* si el usuario no está autorizado, se redirecciona al Login */}
            {auth._id ? (
                <main>
                    <Outlet />
                </main>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};
