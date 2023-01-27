const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
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
        state: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["Baja", "Media", "Alta"], //enumerador
            default: "Baja",
        },
        project: {
            type: mongoose.Schema.Types.ObjectId, //traemos un identificador de un esquema, en éste caso un proyecto
            ref: "Project", //hacemos referencia al esquema Project para traer sus datos
        },
    },
    {
        timestamps: true,
    }
);

//'User' es el nombre del modelo, cuando queramos acceder a ésta estructura lo hacemos através de él
module.exports = mongoose.model("Project", taskSchema);
