const descargaCtrl = {}
const participantePruebaModel = require('../models/Pruebas/participantePrueba.model');
var mongoXlsx = require('mongo-xlsx');
var data = [];
var mime = require('mime-types')
var path = require('path');

descargaCtrl.descargaParticipantes = async(req,res,next) =>{
    filepath = path.join(__dirname,'../Descargas') +'/Participantes/'+ req.body.filename;

    console.log(filepath);
    var consulta = await participantePruebaModel.find({}).lean();
    data = consulta
    var options =  {
    save: true,
    sheetName: [],
    fileName: "Participantes"  + ".xlsx",
    path: "./Descargas/Participantes",
    defaultSheetName: "worksheet"
  }
  //var path = './Descargas/Participantes/Participantes.xlsx'
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

module.exports = descargaCtrl;



/*res.format ({
        'text/plain': function() {
           res.send('hey');
        },
     
        'text/html': function() {
           res.send('hey'); 
        },
     
        'application/json': function() {
           res.send({ message: 'hey' });
        },
     
        'default': function() {
           // log the request and respond with 406
           res.status(406).send('Not Acceptable');
        }
     });*/
    