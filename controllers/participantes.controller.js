const participantesCtrl = {};
const participanteModel = require('../models/participante.model');
const participantePruebaModel = require('../models/Pruebas/participantePrueba.model');
const grupoPruebaModel = require('../models/Pruebas/grupoPrueba.model');
const mongoose =require ('mongoose');





//Este metodo aqui ya ingresa participantes a la DB si esta esta conectada.
participantesCtrl.agregarParticipante = (req, res, next) =>{
    //const participanteNuevo = new participantePruebaModel(req.body);
    const participanteNuevo = new participantePruebaModel(req.body);
    console.log(req.body.celular);
    participanteNuevo.save();
    console.log(participanteNuevo);
    res.status(201).json({
        message: 'Post Añadido'
    });
    
}


//Devuelve un participante según el número de documento ingresado
participantesCtrl.getParticipanteDoc = async (req, res, next) => {
    console.log(req.params.documento);
    const participantes = await participantePruebaModel.find({ documento: req.params.documento });
    //const participantes = await participanteModel.find({ documento: req.params.documento });
    console.log(participantes);
    res.json(participantes);
    
}

//Devuelve un participante según el nombre ingresado
participantesCtrl.getParticipanteNom = async (req, res, next) => {
    console.log(req.params.nombre);
    const participantes = await participantePruebaModel.find({ nombre: req.params.nombre});
    //const participantes = await participanteModel.find({ nombre: req.params.nombre});
    console.log(participantes);
    res.json(participantes); 
    
}

//Devuelve un participante según el colegio ingresado
participantesCtrl.getParticipanteCol = async (req, res, next) => {
    console.log(req.params.colegio);
    const participantes = await participantePruebaModel.find({ 'colegio.nombre': req.params.colegio});
    //const participantes = await participanteModel.find({ nombre: req.params.nombre});
    console.log(participantes);
    res.json(participantes); 
}


//Devuelve un participante según el grupo ingresado
participantesCtrl.getParticipanteGru = async (req, res, next) => {
    const grupo = await grupoPruebaModel.findOne({ codigoGrupo: req.params.grupo });
    console.log(req.params.grupo);
    if(grupo.integrantes != null){
        var integrantes = [];

        for(i = 0; i < grupo.integrantes.length; i++){
            
            const participante = await participantePruebaModel.findById(grupo.integrantes[i]);
            integrantes.push(participante);

        }

        console.log(integrantes);
        res.json(integrantes);
    }
}

participantesCtrl.editParticipante = function () {
    
}

participantesCtrl.asignarGrupo = async (req, res, next) => {

    console.log(req.params);
    var consulta2 = await participantePruebaModel.findOne({documento:req.params.documento});
    var id = consulta2._id;
    const code= {
        $addToSet:{integrantes:id}   
      };
    const consulta = await grupoPruebaModel.findOneAndUpdate({ codigoGrupo: req.params.idGrupo },code,function(err,grupos){
        if(err) console.log(err);

   });
   var consulta3 = await grupoPruebaModel.find({}).populate('integrantes');
   consulta3.forEach(element => {
       console.log(element.integrantes);
   });
   console.log(consulta3);
   res.json(consulta); 
    
}
participantesCtrl.addGrupo = async (req, res, next) => {
    const grupo = await grupoPruebaModel(req.body);
    console.log(req.body);
    console.log(grupo);
    grupo.save();
    res.status(201).json({
        message: 'Post Añadido'
    });

    
}


module.exports = participantesCtrl;