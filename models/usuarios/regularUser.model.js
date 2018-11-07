const moongose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = moongose.Schema({
    nombre: {type: String, required:true},
    documento: {type: Number, required:true},
    numeroDeContacto: {type: Number},
    prioridad: {type: Number},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique:true}, 
    password: {type: String, required:true}
});

userSchema.plugin(uniqueValidator);

module.exports = moongose.model("RegularUser", userSchema);