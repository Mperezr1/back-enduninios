const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;

const colegioSchema = Schema({
    nombre: {type: String, require: true},
    tipo: {type: String, require: true},
    telefono: {type: String, require: true},
    email: {type: String, require: true},
    sitioWeb: {type: String},
    direccion: {type: String, require: true},
    barrio: {type : ObjectId, ref: 'Barrio'},
    estrato: {type: String, require: true},
    tipoCalendario: {type: String, require: true},
    caracter: {type: String, require: true},
    jornada: {type: String, require: true},
    numeroEstudiantes: {type: String, require: true},
    contactos: [{
        nombreCompleto: {type: String, require: true},
        cargo: {type: String, require: true},
        tipoContacto: {type: String, require: true},
        email: {type: String, require: true},
        telefono: {type: String, require: true},
        celular: {type: String, require: true}
    }]
});

module.exports = mongoose.model('Colegio', colegioSchema);