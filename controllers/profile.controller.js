const profileCtrl = {};
const express = require("express");
const participantePruebaModel = require('../models/Pruebas/participantePrueba.model');

profileCtrl.getAcudientes =  async (req, res, next) => {

    const nombre = req.headers.authorization.split(" ")[2];
    console.log(req.headers.authorization);
    let participantesEncontrados = [];

    await participantePruebaModel.find({"acudientes.email": nombre}, function(err, docs){
        participantesEncontrados.push(docs);
    });
    res.status(201).json({
        message: 'Acudientes:',
        posts: participantesEncontrados
      });  

};

module.exports = profileCtrl;