module.exports = {

    list: async (req, res) => {
        //registra al usuario
        try {
            return res.status(201).json({
                ok: true,
                msg: "Projects list",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong in projects list",
            });
        }
    },

    store: async (req, res) => {
        //logea al usuario

        try {
            return res.status(200).json({
                ok: true,
                msg: "Project stored",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while storing the project",
            });
        }
    },

    detail: async (req, res) => {
        //verificar que el usuario sea una persona y no un robot
        try {
            return res.status(200).json({
                ok: true,
                msg: "Project detail",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong in project detail",
            });
        }
    },

    update: async (req, res) => {
        //envía un token por si el usuario quiere restablecer su contraseña
        try {
            return res.status(201).json({
                ok: true,
                msg: "Project updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while updating the project",
            });
        }
    },

    remove: async (req, res) => {
        //permite checkear el token recibido por el usuario
        try {
            return res.status(200).json({
                ok: true,
                msg: "Project deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while deleting the project",
            });
        }
    },

    addCollaborator: async (req, res) => {
        //permite cambiar la contraseña
        try {
            return res.status(201).json({
                ok: true,
                msg: "Collaborator added successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while adding the collaborator",
            });
        }
    },

    removeCollaborator: async (req, res) => {
        //permite cambiar la contraseña
        try {
            return res.status(200).json({
                ok: true,
                msg: "Collaborator removed",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while removing the collaborator",
            });
        }
    },
};
