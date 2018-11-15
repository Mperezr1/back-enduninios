const mongoose = require('mongoose');
const { Schema } = mongoose;

const listaSchema = Schema({
    nombre: {type: String, require: true},
    data: [{type: String, require: true}]
});

module.exports = mongoose.model('listas', listaSchema);