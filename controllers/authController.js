module.exports = {
    register: async (req, res) => {
        //registra al usuario
        try {
            const { name, email, password } = req.body;

            //si los campos vienen vacíos
            if ([name, email, password].includes("")) {
                let error = new Error("Todos los campos son obligatorios");
                error.status = 400;
                throw error;
            }

            return res.status(201).json({
                ok: true,
                msg: "User registered",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong in registration",
            });
        }
    },

    login: async (req, res) => {
        //logea al usuario

        try {
            return res.status(200).json({
                ok: true,
                msg: "User logged in",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong in logging in",
            });
        }
    },

    checked: async (req, res) => {
        //verificar que el usuario sea una persona y no un robot
        try {
            return res.status(201).json({
                ok: true,
                msg: "User checked",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Ups... Something went wrong in checking",
            });
        }
    },

    sendToken: async (req, res) => {
        //envía un token por si el usuario quiere restablecer su contraseña
        try {
            return res.status(200).json({
                ok: true,
                msg: "User send token",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong with your token",
            });
        }
    },

    verifyToken: async (req, res) => {
        //permite checkear el token recibido por el usuario
        try {
            return res.status(200).json({
                ok: true,
                msg: "User verified token",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong with your token verification",
            });
        }
    },

    changePassword: async (req, res) => {
        //permite cambiar la contraseña
        try {
            return res.status(201).json({
                ok: true,
                msg: "User changed password",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong with your password change",
            });
        }
    },
};
