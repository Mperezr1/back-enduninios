const mongoose = require('mongoose');
const { Schema } = mongoose;

const programaSchema = Schema({
    nombre: {type: String, required: true},
    fechaInicio: {type: Date},
    fechaFin: {type: Date},
    actividades: [{
        nombre: {type: String},
        fecha: {type: Date}
    }],
});

module.exports = mongoose.model('Programa', programaSchema);