const mongoose = require('mongoose');
const BaseDatos = "mongodb+srv://webApi:8xlTiB6BAS7SKNx4@clusterunininos0-ttwgu.mongodb.net/participantes";
//const BaseDatos = "mongodb://localhost:27017/PerseoMuestra";

mongoose.connect(BaseDatos,{ useNewUrlParser: true })
    .then(() => {
        console.log('Conectado a Base de Datos')
        //myFunc();
    })
    .catch(() => {
        console.log('Error al conectarse a Base de Datos')
    });
module.exports = mongoose;  


