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
    await estadisticasPruebaModel.find({},function(err,docs){ 
         console.log('Estadisticas a utilizar: ');
         console.log(docs);
         console.log('Cantidad de estadisticas');
         console.log(docs.length);
     })
     //Recordar que documents es lo que pasa en la anterior funcion de find
         .then(documents => {
         res.status(200).json({
         message: 'Se alcanzo el post',  
         posts: documents
         });
     });    
 }

 
module.exports = estadisticasCtrl;