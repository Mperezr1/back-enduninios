const mongoose = require('mongoose');
const { Schema } = mongoose;

const horarioSchema = Schema({
    actividades: [{
        nombre: {type: String, required: false},
        hora: {type: TimeRanges, required: false}
    }],
});

module.exports = mongoose.model('Horario', horarioSchema);