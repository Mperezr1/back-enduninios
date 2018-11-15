const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const indexRoutes = require('./routes/index');
const participantePruebaModel = require('./models/Pruebas/participantePrueba.model');
const participante = require('./models/participante.model');
const { mongoose } = require('./database');
  
//Configuraciones del Servidor
app.set('port', process.env.PORT || 8000);

//Middleware para servir archivos estaticos
app.use(cors());
app.use(express.static('../webApiUniNinos-SPA/dist/webApiUniNinos-SPA'));

//Middleware bodyparser y morgan
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//Routes
app.use('/',indexRoutes);


//Diciendole a la app el puerto donde va a escuchar.
app.listen(app.get('port'), () =>{

    console.log('Servidor en puerto', app.get('port'))

});

