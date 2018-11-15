const mongoose = require('mongoose');
const { Schema } = mongoose;

const barrioSchema = Schema({
    nombre: {type: String},
    comuna: {type: String},
    municipio: {type: String}

});

module.exports = mongoose.model('Barrio', barrioSchema);