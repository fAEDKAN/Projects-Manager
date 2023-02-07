import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <>
            <main className="h-screen w-full bg-gray-900 flex justify-center items-center">
                <div>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;
