const mongoose = require('mongoose');
const { Schema } = mongoose;

const preguntaSchema = Schema({
    pregunta: {type: String, require: true},
    respuesta: {type: String, require: true}
});

module.exports = mongoose.model('Pregunta', preguntaSchema);