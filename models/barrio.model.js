const mongoose = require('mongoose');
const { Schema } = mongoose;

const barrioSchema = Schema({
    nombre: {type: String, required: true},
    comuna: {type: String, required: true},
    municipio: {type: String, required: true}

});

module.exports = mongoose.model('Barrio', barrioSchema);