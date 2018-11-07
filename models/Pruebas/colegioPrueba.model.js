const mongoose = require('mongoose');
const { Schema } = mongoose;

const colegioSchema = Schema({
    nombre: {type: String},
    contactos: [{
        nombreCompleto: {type: String},
        celular: {type: String},
    }],
    barrios: {type: String}

});

module.exports = mongoose.model('ColegioPrueba', colegioSchema);