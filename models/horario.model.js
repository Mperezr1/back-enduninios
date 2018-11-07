const mongoose = require('mongoose');
const { Schema } = mongoose;

const horarioSchema = Schema({
    actividades: [{
        nombre: {type: String, required: true},
        hora: {type: TimeRanges, required: true}
    }],
});

module.exports = mongoose.model('Horario', horarioSchema);