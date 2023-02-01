import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import RecoverPassword from "./pages/RecoverPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                        path="forget-password"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="recover-password/:token"
                        element={<RecoverPassword />}
                    />
                    <Route path="confirm/:token" element={<ConfirmAccount />} />
                    <Route path="*" element={<h1>404: NOT FOUND!</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
