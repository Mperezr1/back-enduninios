const estadisticasCtrl = {};
const participantePruebaModel = require('../models/Pruebas/participantePrueba.model');
const estadisticasPruebaModel = require('../models/Pruebas/estadisticas-colegios.model');

estadisticasCtrl.guardarEstadisticas = async (req, res, next) => {
        //Si la estadistica es igual a cantidad de estudiantes procedemos a hallar todos los participantes, y hallar las cantidades para cada colegio
    if(req.body.atributoSeleccionado === 'Cantidad estudiantes'){

       await participantePruebaModel.find({}, function(err, docs){
            var datosQueCumplenParametros = [];
            dataToSave = [];
            const varNames = req.body.parametrosAUsar;
            var varLabels = req.body.barChartLabels;

            //Como se conocen todos los colegios procedemos a sacar los participantes que cumplen las caracteristicas deseadas
            docs.forEach(function(item){  
                var contCheck = 0;
                    for(i = 0; i < req.body.parametrosAUsar.length; i++){ 
                        if(item[varNames[i]] === varLabels[i]){
                                contCheck++;
                            }
                }
                if(contCheck === req.body.parametrosAUsar.length){
                    datosQueCumplenParametros.push(item);
                }
            });
            for(i=0;i<req.body.seriesData.length;i ++){
                var auxCont = 0;
            datosQueCumplenParametros.forEach(function(item){
                if(item.colegioActual === req.body.seriesData[i]){
                    auxCont++;
                }
            });
            dataToSave.push({data: auxCont, label:req.body.seriesData[i]});
        };

        const post = new estadisticasPruebaModel(
            {
                seriesData: req.body.seriesData,
                atributoSeleccionado: req.body.atributoSeleccionado,
                parametrosAUsar: req.body.parametrosAUsar,
                barChartData:dataToSave,
                barChartLabels:req.body.barChartLabels,
                barChartLenged:req.body.barChartLenged,
                barChartType:req.body.barChartType
            }
            );

            console.log('Cantidad de datos usados: ' + datosQueCumplenParametros.length);
            console.log('Post a guardar: ');
            console.log(post);

            post.save();

        }).then(documents => {
            res.status(201).json({
                message: 'Estadistica añadida'
              });  
        });      
    } else {    
    console.log('no implementado');
    res.status(201).json({
      message: 'Estadistica añadida correctamente'
    });  
}
};

estadisticasCtrl.getEstadisticas = async (req, res, next) => {
    var participacionAnual = [];
    console.log("Se busco cantidad de participacion anual");
    //Primero hallamos la estadistica para todos los participantes por cada año, luego se anidan las demas estadisticas
    for(i=2000; i< 2019;i++){
    await participantePruebaModel.find({"participaciones.año": i},function(err,docs){ 
         participacionAnual.push(docs.length);
     });
    }
    console.log(participacionAnual);
    res.status(200).json({
        message: 'Post Con los participantes de cada año',
        participacionAn: participacionAnual
    }); 
 }

 estadisticasCtrl.getEstadisticasPorColegioPActivo = async (req, res, next) => {
    const colegios = ['colombo americano', 'colombo frances', 'colombo ingles','la compañia de maria', 'montessori', 'the columbus school','seminario corazonista','inem'];
    var participanteActivo = [];
    //Tiene que quedar {colegio: de la lista, activo: numero de activos que tiene, inactivo: numero de inactivos que tiene, egresado: numero de egresados que tiene}
    console.log("Se busco cantidad de colegios que tienen estudiantes activos, inactivos o egresados");
    for(i=0; i< colegios.length; i++){
    const dataElement = [];
    await participantePruebaModel.find({"estado": "Activo", "colegioActual": colegios[i]},function(err,docs){ 
         dataElement.push(docs.length);
     });
    await participantePruebaModel.find({"estado": "Egresado", "colegioActual": colegios[i]},function(err,docs){ 
        dataElement.push(docs.length);
    });
    await participantePruebaModel.find({"estado": "Inactivo", "colegioActual": colegios[i]},function(err,docs){ 
        dataElement.push(docs.length);
    });

    participanteActivo.push(dataElement);
    }

    console.log(participanteActivo);
    res.status(200).json({
        message: 'Post con los participantes activos por cada colegio',
        participacionAn: participanteActivo
    }); 
 }


 
module.exports = estadisticasCtrl;