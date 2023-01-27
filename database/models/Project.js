const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        dateExpire: {
            type: Date,
            default: Date.now(),
        },
        client: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, //traemos un identificador de un esquema, en éste caso un usuario
            ref: "User", //hacemos referencia al esquema User para traer sus datos
        },
        collaborators: [ //array de usuarios, donde estarán todos los colaboradores
            {
                type: mongoose.Schema.Types.ObjectId, //traemos un identificador de un esquema, en éste caso un usuario
                ref: "User", //hacemos referencia al esquema User para traer sus datos
            },
        ],
    },
    {
        timestamps: true,
    }
);

//'User' es el nombre del modelo, cuando queramos acceder a ésta estructura lo hacemos através de él
module.exports = mongoose.model("Project", projectSchema);
