const preguntasCtrl = {};
const preguntaModel = require('../models/pregunta.model.js');

//Este metodo ayuda a usar CORS que nos permite brindar permisos al back-end para que se pueda 
//comunicar facilmente con el front-end que es angular.
preguntasCtrl.utilizarCors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
}

preguntasCtrl.getPregunta = async (req, res, next) => {
    preguntaNueva = await preguntaModel.find();
    console.log("buscando preguntas");
    if(preguntaNueva == null) {
        res.status(201).json(null);
    } else {
        res.status(201).json(preguntaNueva);
    }
}

//Este metodo aqui ya ingresa preguntas a la DB si esta conectada.
preguntasCtrl.agregarPregunta = async (req, res, next) =>{

    const preguntaNueva = new  preguntaModel(req.body);
    console.log(req.body);
    preguntaNueva.save();
    console.log(preguntaNueva);
    res.status(201).json({message: "Pregunta Añadida a la base de datos"});
}

preguntasCtrl.borrarPregunta = async (req, res, next) => {
    console.log(req.params.pregunta);    
    const preguntaNueva = await preguntaModel.findByIdAndDelete(req.params.id);
    console.log(preguntaNueva);
    res.status(201).json(preguntaNueva);
}

module.exports = preguntasCtrl;