const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;

const grupoSchema = Schema({
    codigoGrupo: {type: String, required: true},
    programa: {type: ObjectId, ref: 'Programa'},
    integrantes: [{type: ObjectId, ref: 'Participante'}],
    monitor: {
        nombreCompleto: {type: String, required: true},
        celular: {type: String, required: true},
    },
    horario: {type: ObjectId, ref: 'Horario'}

});

module.exports = mongoose.model('Grupo', grupoSchema);