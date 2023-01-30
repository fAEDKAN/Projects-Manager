import React from "react";

export const AuthLayout = () => {
    return (
        <>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;