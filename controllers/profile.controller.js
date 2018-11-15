const profileCtrl = {};
const express = require("express");
const participanteModel = require('../models/participante.model');

profileCtrl.getAcudientes =  async (req, res, next) => {

    const nombre = req.headers.authorization.split(" ")[2];
    console.log(nombre);
    let participantesEncontrados = [];

    var consulta = await participanteModel.find({"acudientes.email":nombre}, function(err, docs){
        
    }).populate().lean();
    console.log(consulta);
    res.json(consulta);

};

module.exports = profileCtrl;