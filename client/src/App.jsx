import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
/* import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import RecoverPassword  from "./pages/RecoverPassword"; */

function App() {
    return (
        <>
            <BrowserRouter>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/register">Registrarme </Link>
                {/*                 <Link to="/confirm-account">Confirmar Cuenta</Link>
                <Link to="/forget-password">Olvidé mi Contraseña</Link>
                <Link to="/reset-password">Restablecer Contraseña</Link> */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/*                     <Route path="/confirm-account" element={<ConfirmAccount />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<RecoverPassword />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
