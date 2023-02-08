import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <>
            <main className="bg-no-repeat bg-cover bg-center h-screen w-screen flex justify-center items-center">
                <div>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;
