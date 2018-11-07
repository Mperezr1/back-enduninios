const mongoose = require('mongoose');
const ColegioPrueba = require('./colegioPrueba.model')
const { Schema } = mongoose;


const participantePruebaSchema = Schema({
    nombre: {type: String},
    documento: {type: String},
    barrio: {type: String},
    apellido: {type: String},
    estrato: {type: String},
    edad: {type: String},
    colegioActual: {type: String},

    acudientes: [{
        nombreCompleto: {type: String},
    }],
    colegio: {
        nombre: {type: String},
        contactos: [{nombreCompleto: {type:String},  celular: {type:String}}],
        barrio: {type: String}
    }
});

module.exports = mongoose.model('ParticipantePrueba', participantePruebaSchema);