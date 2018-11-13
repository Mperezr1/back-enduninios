const authCtrl = {};
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/usuarios/regularUser.model");
const jwt = require("jsonwebtoken");

//PRIORIDAD 0 ES BAJA 1 ES MEDIA Y 2 ES ALTA

authCtrl.signup = (req,res,next) => {

bcrypt.hash(req.body.password, 10)
.then(hash => {

    const user = new User({
        nombre : req.body.nombre , 
        apellido: req.body.apellido,
        prioridad: 0,
        documento: req.body.documento, 
        numeroDeContacto: req.body.contacto, 
        email: req.body.email, 
        password: hash
    
    });
    user.save()
    .then(result => {
        console.log("Usuario Creado ");
        console.log(result);
        res.status(201).json({
            message: 0
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 1,
            error: err
        });
    });
});  

};

authCtrl.signupAdmin = (req,res,next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    
        const user = new User({
            nombre : req.body.nombre , 
            apellido: req.body.apellido,
            prioridad: 2,
            documento: req.body.documento, 
            numeroDeContacto: req.body.contacto, 
            email: req.body.email, 
            password: hash
        
        });
        user.save()
        .then(result => {
            console.log("Usuario Creado como admin");
            console.log(result);
            res.status(201).json({
                message: 0
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 1,
                error: err
            });
        });
    });  

};

authCtrl.signupMonitor = (req,res,next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    
        const user = new User({
            nombre : req.body.nombre , 
            apellido: req.body.apellido,
            prioridad: 1,
            documento: req.body.documento, 
            numeroDeContacto: req.body.contacto, 
            email: req.body.email, 
            password: hash
        
        });
        user.save()
        .then(result => {
            console.log("Usuario Creado como monitor ");
            console.log(result);
            res.status(201).json({
                message: 0
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 1,
                error: err
            });
        });
    });  

};

authCtrl.login = (req, res, next) => {
let usuarioEncontrado;
User.findOne({email: req.body.email})
.then(user => {
    if(!user){
        return res.status(401).json({
            message: "No se encontro un usuario con el correo: " + req.body.email 
        });
    }
    usuarioEncontrado = user;
   return  bcrypt.compare(req.body.password, user.password);
})
.then(result => {

    if(!result){
        return res.status(401).json({
            message: "La constraseña no coincide"
        });
    }
    const token = jwt.sign({email: usuarioEncontrado.email, userId: usuarioEncontrado._id}, "palabra_secreta_que_deberia_guardar_y_hashear_en_la_db", 
    {expiresIn: "1h"}
    );
    res.status(200).json({
        message: "Usuario logeado exitosamente",
        token:token, 
        priorty: usuarioEncontrado.prioridad,
        nombre: usuarioEncontrado.nombre,
        documento: usuarioEncontrado.documento
    });
})
.catch(err => {
    return res.status(401).json({
        message: "Error en la authentificacion."
    });
});

};

module.exports = authCtrl;