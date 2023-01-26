module.exports = {

    list: async (req, res) => {
        //registra al usuario
        try {
            return res.status(201).json({
                ok: true,
                msg: "Tasks list",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while listing tasks",
            });
        }
    },

    store: async (req, res) => {
        //logea al usuario

        try {
            return res.status(200).json({
                ok: true,
                msg: "Task stored",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while storing task",
            });
        }
    },

    detail: async (req, res) => {
        //verificar que el usuario sea una persona y no un robot
        try {
            return res.status(200).json({
                ok: true,
                msg: "Task detail",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while retrieving task",

            });
        }
    },

    update: async (req, res) => {
        //envía un token por si el usuario quiere restablecer su contraseña
        try {
            return res.status(201).json({
                ok: true,
                msg: "Task updated",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while updating task",
            });
        }
    },

    remove: async (req, res) => {
        //permite checkear el token recibido por el usuario
        try {
            return res.status(200).json({
                ok: true,
                msg: "Task deleted",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while deleting task",
            });
        }
    },

    changeState: async (req, res) => {
        //permite cambiar la contraseña
        try {
            return res.status(201).json({
                ok: true,
                msg: "Task state changed",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while changing task state",
            });
        }
    },
};
