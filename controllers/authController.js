const createError = require("http-errors");
const User = require("../database/models/User");
const errorResponse = require("../helpers/errorResponse");
const generateRandomToken = require("../helpers/generateRandomToken");
const generateJWT = require("../helpers/generateJWT");
const { confirmRegister, forgetPassword } = require("../helpers/sendMails");

module.exports = {
    register: async (req, res) => {
        //registra al usuario
        try {
            const { name, email, password } = req.body;

            //si los campos vienen vacíos
            if ([name, email, password].includes("")) {
                throw createError(400, "Todos los campos son obligatorios");
            }

            let user = await User.findOne({
                email,
            });

            if (user) {
                throw createError(400, "El email ya se encuentra registrado");
            }

            const token = generateRandomToken();

            user = new User(req.body);
            user.token = token;

            //guardamos el usuario
            const userStore = await user.save();

            //TODO: enviar el email de confirmación
            await confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token,
            });

            return res.status(201).json({
                ok: true,
                msg: "User registered",
                data: userStore,
            });
        } catch (error) {
            return errorResponse(res, error, "REGISTER");
        }
    },

    login: async (req, res) => {
        //logea al usuario

        const { email, password } = req.body;

        try {
            if ([email, password].includes("")) {
                throw createError(400, "Todos los campos son obligatorios");
            }

            let user = await User.findOne({
                email,
            });

            if (!user) {
                throw createError(403, "Credenciales inválidas | EMAIL");
            }

            if (!user.checked) {
                throw createError(403, "Tu cuenta no ha sido confirmada");
            }

            if (!(await user.checkedPassword(password))) {
                throw createError(403, "Credenciales inválidas | PASSWORD");
            }

            return res.status(200).json({
                ok: true,
                msg: "User logged in",
                user: {
                    nombre: user.name,
                    email: user.email,
                    token: generateJWT({
                        id: user._id,
                    }),
                },
            });
        } catch (error) {
            return errorResponse(res, error, "LOGIN");
        }
    },

    checked: async (req, res) => {
        //verificar que el usuario sea una persona y no un robot

        const { token } = req.query; //http://localhost:4000/api/auth/check?token=asdakwqxasm

        try {
            if (!token) {
                throw createError(400, "Token inexistente");
            }

            const user = await User.findOne({
                token,
            });

            if (!user) {
                throw createError(400, "Token inválido");
            }

            user.checked = true;
            user.token = "";

            await user.save();

            return res.status(201).json({
                ok: true,
                msg: "Registro completado con éxito!",
            });
        } catch (error) {
            return errorResponse(res, error, "CHECKED");
        }
    },

    sendToken: async (req, res) => {
        //envía un token por si el usuario quiere restablecer su contraseña

        const { email } = req.body;

        try {
            let user = await User.findOne({ email: email });

            if (!user)
                throw createError(400, "El email no se encuentra registrado");

            const token = generateRandomToken();

            user.token = token;
            await user.save();

            await forgetPassword({
                name: user.name,
                email: user.email,
                token: user.token,
            });

            return res.status(200).json({
                ok: true,
                msg: "Se ha enviado un email con las instrucciones",
            });
        } catch (error) {
            return errorResponse(res, error, "SEND-TOKEN");
        }
    },

    verifyToken: async (req, res) => {
        //permite checkear el token recibido por el usuario
        try {
            const { token } = req.body;

            if (!token) throw createError(400, "Token inexistente");

            const user = await User.findOne({
                token,
            });

            if (!user) throw createError(400, "Token inválido");

            return res.status(200).json({
                ok: true,
                msg: "User verified token",
            });
        } catch (error) {
            return errorResponse(res, error, "VERIFY-TOKEN");
        }
    },

    changePassword: async (req, res) => {
        //permite cambiar la contraseña
        try {
            const { token } = req.query;
            const { password } = req.body;

            if (!password)
                throw createError(400, "La contraseña es obligatoria");

            const user = await User.findOne({
                token,
            });

            user.password = password;
            user.token = "";
            await user.save();

            return res.status(201).json({
                ok: true,
                msg: "User changed password",
            });
        } catch (error) {
            return errorResponse(res, error, "CHANGE-PASSWORD");
        }
    },
};
