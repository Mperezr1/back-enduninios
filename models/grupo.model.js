const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;

const grupoSchema = Schema({
    codigoGrupo: {type: String, required: false},
    programa: {type: mongoose.Schema.Types.ObjectId, ref: 'Programa'},
    integrantes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Participante'}],
    monitor: {
        nombreCompleto: {type: String, required: false},
        celular: {type: String, required: false},
    },
    horario: {type: mongoose.Schema.Types.ObjectId, ref: 'Horario'}

});

module.exports = mongoose.model('Grupo', grupoSchema);