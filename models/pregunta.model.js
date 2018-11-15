const mongoose = require('mongoose');
const { Schema } = mongoose;

const preguntaSchema = Schema({
    pregunta: {type: String, require: false},
    respuesta: {type: String, require: false}
});

module.exports = mongoose.model('Pregunta', preguntaSchema);