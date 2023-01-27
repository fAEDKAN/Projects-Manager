const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        token: {
            type: String,
        },
        checked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

//el método '.pre' permite ejecutar una función antes de guardar el documento
userSchema.pre("save", async function (next) {
    //si no se está modificando el password, salteamos la ejecución
    if (!this.isModified("password")) {
        next();
    }

    //antes de guardarlo, hasheamos el password
    this.password = await hash(this.password, 10);
});

//usamos 'function' y no 'arrow function' porque sino no toma la palabra reservada 'this'
userSchema.methods.checkedPassword = async function (password) {
    return await compare(password, this.password);
};

//'User' es el nombre del modelo, cuando queramos acceder a ésta estructura lo hacemos através de él
module.exports = mongoose.model("User", userSchema);
