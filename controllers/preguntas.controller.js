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
    preguntaNueva = await preguntaModel.find({})
    .exec(function(err, preguntaNueva){
        if(err){
            console.log("Error");
        }
        else {
            res.json(preguntaNueva);
        }
    });
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
    console.log("entra al controller");
    console.log(req.body.pregunta);
    preguntaNueva = await preguntaModel.findOneAndRemove({ pregunta: req.body.pregunta }).update().catch(function(reason){
        console.log("Archivo no borrado");
    });
    console.log(preguntaNueva);
    res.status(201).json({message: "Pregunta eliminada a la base de datos"});
}

module.exports = preguntasCtrl;