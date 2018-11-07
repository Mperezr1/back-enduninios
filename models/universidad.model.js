const mongoose = require('mongoose');
const { Schema } = mongoose;

const universidadSchema = Schema({
    nombre: {type: String, required: true},
    municipio: {type: String, required: true},
    tipo: {type: String, required: true}

});

module.exports = mongoose.model('Universidad', universidadSchema);