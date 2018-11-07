const mongoose = require('mongoose');
const { Schema } = mongoose;

const estadisticasPruebaSchema = Schema({
    
    seriesData: [{type: String}],
    atributoSeleccionado: {type: String},
    parametrosAUsar: [{type: String}],
    barChartLabels: [{type: String}],
    barChartType: {type: String},
    barChartLenged: {type: Boolean},
    barChartData:[{data: [Number],label: String}]
});

module.exports = mongoose.model('EstadisticasPrueba', estadisticasPruebaSchema);