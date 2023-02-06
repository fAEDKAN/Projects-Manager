module.exports = {
    profile: async (req, res) => {
        //registra al usuario
        try {
            return res.status(200).json({
                ok: true,
                msg: "User profile",
                user: req.user,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong in user profile",
            });
        }
    },
};
