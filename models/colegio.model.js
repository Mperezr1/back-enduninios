const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;

const colegioSchema = Schema({
    nombre: {type: String, require: false},
    tipo: {type: String, require: false},
    telefono: {type: String, require: false},
    email: {type: String, require: false},
    sitioWeb: {type: String},
    direccion: {type: String, require: false},
    barrio: {type : ObjectId, ref: 'Barrio'},
    estrato: {type: String, require: false},
    tipoCalendario: {type: String, require: false},
    caracter: {type: String, require: false},
    jornada: {type: String, require: false},
    numeroEstudiantes: {type: String, require: false},
    contactos: [{
        nombreCompleto: {type: String, require: false},
        cargo: {type: String, require: false},
        tipoContacto: {type: String, require: false},
        email: {type: String, require: false},
        telefono: {type: String, require: false},
        celular: {type: String, require: false}
    }]
});

module.exports = mongoose.model('Colegio', colegioSchema);