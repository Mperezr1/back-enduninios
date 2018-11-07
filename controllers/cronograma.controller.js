const cronogramaCtrl = {};
const programaModel = require('../models/programa.model');

//Este metodo aqui ya ingresa cronogramas a la DB si esta esta conectada.
cronogramaCtrl.agregarActividad = async (req, res, next) =>{
    console.log("entra ")

    actividadNueva = await programaModel.findOne({nombre: req.params.programa});

    if(actividadNueva == null) {
        const programaNuevo = new programaModel();
        programaNuevo.nombre = req.params.programa;
        programaNuevo.save();
        console.log(programaNuevo);
    }
    actividadNueva = await programaModel.findOne({nombre: req.params.programa});
    actividadNueva = await programaModel.findOneAndUpdate({nombre: req.params.programa}, {$push: {actividades: 
                                                            {"nombre": req.body.nombre,
                                                            "fecha": req.body.fecha}
                                                            }
                                                        });
    actividadNueva = await programaModel.findOne({nombre: req.params.programa});
    console.log(actividadNueva);
    res.status(201).json(actividadNueva.actividades);
}

//Devuelve un cronograma según el nombre del programa ingresado
cronogramaCtrl.getCronograma = async (req, res, next) => {
    actividadNueva = await programaModel.findOne({nombre: req.params.programa});
    console.log(actividadNueva);
    if(actividadNueva == null) {
        res.status(201).json(null);
    } else {
        res.status(201).json(actividadNueva.actividades);
    }
}

//Elimina la actividad ingresada
cronogramaCtrl.borrarActividad = async (req, res, next) => {
    actividadNueva = await programaModel.findOneAndUpdate(
        { nombre: req.params.programa },
        { $pull: { actividades: { nombre: req.params.actividad }}});
    
    actividadNueva.save();
    actividadNueva = await programaModel.findOne({ nombre: req.params.programa });
    console.log(actividadNueva);
    res.status(201).json(actividadNueva.actividades);
}

module.exports = cronogramaCtrl;