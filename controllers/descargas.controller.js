const descargaCtrl = {}
const participantePruebaModel = require('../models/Pruebas/participantePrueba.model');
var mongoXlsx = require('mongo-xlsx');
var mime = require('mime-types')
var path = require('path');

descargaCtrl.descargaParticipantes = async(req,res,next) =>{
    var filepath = path.join(__dirname,'../descargados') +'/Participantes/'+ req.body.filename;

    console.log(filepath);
    var consulta = await participantePruebaModel.find({}).lean();
    var data = consulta
    var options =  {
    save: true,
    sheetName: [],
    fileName: "Participantes"  + ".xlsx",
    path: "./descargados/Participantes",
    defaultSheetName: "worksheet"
  }
  var fileName = 'Participantes.xlsx'
    /* Generate automatic model for processing (A static model should be used) */
    var model = mongoXlsx.buildDynamicModel(data);
   // console.log(model);
    /* Generate Excel  and download */

    mongoXlsx.mongoData2Xlsx(data, model, options,function(err, data) {
        
        if(err){
            console.log(err);
        }
        mime.extension('application/octet-stream')
        res.sendFile(filepath);
    });
}

descargaCtrl.descargarConsulta = async(req,res,next) =>{
    var filepath = path.join(__dirname,'../descargados') +'/Participantes/'+ req.body.filename;
    var data = req.body.consultas;
    var options =  {
        save: true,
        sheetName: [],
        fileName: "Consulta"  + ".xlsx",
        path: "./descargados/Participantes",
        defaultSheetName: "worksheet"
      }
    var model = mongoXlsx.buildDynamicModel(data);
    mongoXlsx.mongoData2Xlsx(data, model, options,function(err, data) {
        
        if(err){
            console.log(err);
        }
        mime.extension('application/octet-stream')
        res.sendFile(filepath);
    });
}

module.exports = descargaCtrl;
