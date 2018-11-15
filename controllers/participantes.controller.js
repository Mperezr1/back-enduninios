const participantesCtrl = {};
const participanteModel = require('../models/participante.model');
const grupoModel = require('../models/grupo.model');
const mongoose =require ('mongoose');
var path = require('path');





//Este metodo aqui ya ingresa participantes a la DB si esta esta conectada.
participantesCtrl.agregarParticipante = (req, res, next) =>{
    const participanteNuevo = new participanteModel(req.body);
    console.log(req.body.celular);
    participanteNuevo.save();
    console.log(participanteNuevo);
    res.status(201).json({
        message: 'Post Añadido'
    });
    
}

//Devuelve un participante según el número de documento ingresado
participantesCtrl.borrarParticipantes = async (req, res, next) => {
    console.log(req.params.documento);
    const participantes = await participanteModel.findByIdAndDelete(req.params.id);
    //const participantes = await participanteModel.find({ documento: req.params.documento });
    console.log(participantes);
    res.json(participantes);
    
}

//Devuelve un participante según el número de documento ingresado
participantesCtrl.getParticipanteDoc = async (req, res, next) => {
    console.log(req.params.documento);
    const participantes = await participanteModel.find({ documento: req.params.documento });
    //const participantes = await participanteModel.find({ documento: req.params.documento });
    console.log(participantes);
    res.json(participantes);
    
}

//Devuelve un participante según el nombre ingresado
participantesCtrl.getParticipanteNom = async (req, res, next) => {
    console.log(req.params.nombre);
    const participantes = await participanteModel.find({ "nombreCompleto": { "$regex": req.params.nombre, "$options": "i" } });
    //const participantes = await participanteModel.find({ nombre: req.params.nombre});
    console.log(participantes);
    res.json(participantes); 
    
}

//Devuelve un participante según el colegio ingresado
participantesCtrl.getParticipanteCol = async (req, res, next) => {
    console.log(req.params.colegio);
    const participantes = await participanteModel.find({ "colegioActual.nombre": { "$regex": req.params.colegio, "$options": "i" } });
    //const participantes = await participanteModel.find({ nombre: req.params.nombre});
    console.log(participantes);
    res.json(participantes); 
}


//Devuelve un participante según el grupo ingresado
participantesCtrl.getParticipanteGru = async (req, res, next) => {
    const grupo = await grupoModel.findOne({ codigoGrupo: req.params.grupo });
    console.log(req.params.grupo);
    if(grupo.integrantes != null){
        var integrantes = [];

        for(i = 0; i < grupo.integrantes.length; i++){
            
            const participante = await participanteModel.findById(grupo.integrantes[i]);
            integrantes.push(participante);

        }
        console.log(integrantes);
        res.json(integrantes);
    }
}

//Devuelve un participante según el acudiente ingresado
participantesCtrl.getParticipanteAcu = async (req, res, next) => {
    console.log(req.params.acudiente);
    const participantes = await participanteModel.find({ 'acudientes.documento': req.params.acudiente});
    console.log(participantes);
    res.json(participantes); 
}

participantesCtrl.getParticipantes = async (req, res, next) => {
    const participantes = await participanteModel.find();
    //const participantes = await participanteModel.find();
    res.json(participantes); 
}


//Edita participantes según el código entregado
participantesCtrl.editParticipante = async (req, res, next) => {
    var id = req.params.id;
    var campo = req.params.campo;
    var valor = req.params.valor;
    var query = {};

    query[campo] = valor;

    const participantes = await participanteModel.findByIdAndUpdate(id, { $set: query });
    console.log(participantes);
    res.json(participantes); 
}

participantesCtrl.asignarGrupo = async (req, res, next) => {

    console.log(req.params);
    var consulta2 = await participanteModel.findOne({documento:req.params.documento});
    var id = consulta2._id;
    const code= {
        $addToSet:{integrantes:id}   
      };
    const consulta = await grupoModel.findOneAndUpdate({ codigoGrupo: req.params.idGrupo },code,function(err,grupos){
        if(err) console.log(err);

   });
   var consulta3 = await grupoModel.find({}).populate('integrantes');
   consulta3.forEach(element => {
       console.log(element.integrantes);
   });
   console.log(consulta3);
   res.json(consulta); 
    
}
participantesCtrl.addGrupo = async (req, res, next) => {
    const grupo = await grupoModel(req.body);
    console.log(req.body);
    console.log(grupo);
    grupo.save();
    res.status(201).json({
        message: 'Post Añadido'
    });

    
}

participantesCtrl.saveImage = async (req,res, next) =>{
    console.log(req.params);

    const ruta = '/imagen'+req.params.name;
    var image1 = await participanteModel.findOne({ nombre: req.params.name}).update({imagen: ruta}).catch(function(reason){
        console.log("Imagen Guardada");
    });
};


module.exports = participantesCtrl;