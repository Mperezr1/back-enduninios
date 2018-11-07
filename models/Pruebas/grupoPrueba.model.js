const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;

const grupoSchema = Schema({
    codigoGrupo: {type: String},
    integrantes: [{type:  mongoose.Schema.Types.ObjectId, ref: 'ParticipantePrueba'},{unique:true}]
});

module.exports = mongoose.model('GrupoPrueba', grupoSchema);