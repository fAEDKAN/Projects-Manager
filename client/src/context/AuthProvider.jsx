import { createContext, useEffect, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

//componente padre que "abraza" a sus "hijos" (children)
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                return null;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            try {
                const { data } = await clientAxios.get(
                    "/users/profile",
                    config
                );
                setAuth(data.user);
                navigate("/projects");
                console.log(data);
            } catch (error) {
                console.error(error);
                setAuth({});
            } finally {
                setLoading(false);
            }
        };
        authUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
