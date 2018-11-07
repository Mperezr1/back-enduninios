const mongoose = require('mongoose');
const { Schema } = mongoose;


const participanteSchema = Schema({
    nombre: {type: String, required: false},
    apellidos: {type: String, required: false},
    nombreCompleto: {type: String, required: false},
    tipoDocumento: {type: String, required: false},
    documento: {type: String, required: false},
    fechaNacimiento: {type: Date, required: false},
    añoIngreso: {type: Number, required: false},
    lastUpdate: {type: Date},
    estado: {type: String, required: false},
    participaciones: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Programa'}],
    usoDeImagen: {type: String, required: false},
    genero: {type: String, required: false},
    numerosContacto: [String],
    direccion: {type: String, required: false},
    estrato: {type: Number, required: false},
    barrio: {type : mongoose.Schema.Types.ObjectId, ref: 'Barrio'},
    email: {type: String, required: false},
    eps: {type: String, required: false},
    origen: {
        tipoIngreso: {type: String, required: false},
        gradoIngreso: {type: String, required: false},
        colegioIngreso: {type : mongoose.Schema.Types.ObjectId, ref: 'Colegio'}
    },
    colegioActual: {type : mongoose.Schema.Types.ObjectId, ref: 'Colegio'},
    gradoActual: {type: String, required: false},
    acudientes: [{
        nombreCompleto: {type: String, required: false},
        tipoDocumento: {type: String, required: false},
        documento: {type: String, required: false},
        relacion: {type: String, required: false},
        celular: {type: String, required: false},
        email: {type: String, required: false},
        nivelFormacion: {type: String, required: false},
        areaConocimiento: {type: String, required: false},
        ocupacion: {type: String, required: false},
        lugarTrabajo: {type: String, required: false},
        telefonoTrabajo: {type: String, required: false},
    }],
    activo: {type: Boolean, required: false},
    egresado: {type: Boolean, required: false},
    ocupacion: {type: String},
    areaLaboral: {type: String},
    nivelFormacion: {type: String},
    programaAcademico: {type: String},
    observaciones: {type: String},
    universidad: {type : mongoose.Schema.Types.ObjectId, ref: 'Universidad'},
});

module.exports = mongoose.model('Participante', participanteSchema);