const mongoose = require('mongoose');
const { Schema } = mongoose;

const participanteSchema = Schema({
    estadodb: {type: String},
    estado: {type: String},
    imagen: {type: String},
    edadParticipaciones: {type: Number},
    genero: {type: String},
    nombre: {type: String},
    nombreCompleto: {type: String},
    tipoDocumento: {type: String},
    documento: {type: String},
    fechaNacimiento: {type: String},
    telefono: {type: String},
    celular: {type: String},
    direccion: {type: String},
    barrio: {
        nombre: {type: String},
        comuna: {type: String},
        municipio: {type: String}
    },
    estrato: {type: String},
    email: {type: String},
    eps: {type: String},
    origen: {
        tipoIngreso: {type: String},
        colegioIngreso: {
            nombre: {type: String},
            tipo: {type: String},
            telefono: {type: String},
            email: {type: String},
            sitioWeb: {type: String},
            direccion: {type: String},
            barrio: {
                nombre: {type: String},
                comuna: {type: String},
                municipio: {type: String}
            
            },
            estrato: {type: String},
            tipoCalendario: {type: String},
            caracter: {type: String},
            jornada: {type: String},
            numeroEstudiantes: {type: String},
            contactos: [{
                nombreCompleto: {type: String},
                cargo: {type: String},
                tipoContacto: {type: String},
                email: {type: String},
                telefono: {type: String},
                celular: {type: String}
            }]
        },
        gradoIngreso: {type: String},
        añoIngreso: {type: String},
    },
    colegioActual:{
        nombre: {type: String},
        tipo: {type: String},
        telefono: {type: String},
        email: {type: String},
        sitioWeb: {type: String},
        direccion: {type: String},
        barrio: {
            nombre: {type: String},
            comuna: {type: String},
            municipio: {type: String}
        
        },
        estrato: {type: String},
        tipoCalendario: {type: String},
        caracter: {type: String},
        jornada: {type: String},
        numeroEstudiantes: {type: String},
        contactos: [{
            nombreCompleto: {type: String},
            cargo: {type: String},
            tipoContacto: {type: String},
            email: {type: String},
            telefono: {type: String},
            celular: {type: String}
        }]
    },
    gradoActual: {type: String},
    ocupacion: {type: String},
    areaLaboral: {type: String},
    nivelFormacion: {type: String},
    programaAcademico: {type: String},
    universidad: {type : String},
    observaciones: {type: String},
    acudientes: [{
            relacion: {type: String},
            nombreCompleto: {type: String},
            tipoDocumento: {type: String},
            documento: {type: String},
            celular: {type: String},
            email: {type: String},
            nivelFormacion: {type: String},
            areaConocimiento: {type: String},
            ocupacion: {type: String},
            lugarTrabajo: {type: String},
            telefonoTrabajo: {type: String},
    }],
    activo: {type: String},
    participaciones: [{
        programa: {type: String},
        nombre: {type: String},
        grupo: {type: String}
    }],
    participacionExpediciones: {type: Boolean},
    numParticipaciones: {type: Number, default: 0}   
 });



module.exports = mongoose.model('Participante', participanteSchema);