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

//Este metodo aqui ya ingresa preguntas a la DB si esta conectada.
preguntasCtrl.agregarPregunta = (req, res, next) =>{
    const preguntaNueva = new preguntaModel(req.body);
    preguntaNueva.save();
    console.log(preguntaNueva);
    res.status(201).json({
        message: 'Post Añadido'
    });
    next();
}

preguntasCtrl.borrarPregunta = async (req, res, next) => {
    console.log("entra al controller");
    console.log(req.body.pregunta);
    const preguntas = await preguntaModel.findOneAndDelete({ pregunta: req.body.pregunta }).catch(err => {console.log(err)});
    console.log(preguntas.body.pregunta);
}

module.exports = preguntasCtrl;