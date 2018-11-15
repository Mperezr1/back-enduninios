const express = require("express");
const bodyParser = require("body-parser");
const router = express();
const participante = require('../controllers/participantes.controller');
const pregunta = require('../controllers/preguntas.controller');
const estadistica = require('../controllers/estadisticas.controller');
const auth = require('../controllers/auth.controller');
const profile = require('../controllers/profile.controller');
const checkAuth = require('../middleware/check-auth');
const checkAuthP2 = require('../middleware/check-authP2');
const cronograma = require('../controllers/cronograma.controller');
const descargas = require('../controllers/descargas.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//Este metodo ayuda a usar CORS que nos permite brindar permisos al back-end para que se pueda 
//comunicar facilmente con el front-end que es angular.
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

router.post("/api/participantes",checkAuth , participante.agregarParticipante);

router.post("/api/auth/signup", auth.signup);
router.post("/api/auth/signupAdmin", auth.signupAdmin);
router.post("/api/auth/signupMonitor", auth.signupMonitor);
router.post("/api/auth/login", auth.login);

router.get("/api/profile/acudientes",checkAuth, profile.getAcudientes);

router.get("/api/estadisticasList", checkAuthP2 ,estadistica.getEstadisticas);
//La siguiente ruta no esta funcionando por el momento en el back-end
router.get("/api/estadisticasListColegioActivo", estadistica.getEstadisticasPorColegioPActivo);


router.get('/api/consultasDocumento/:documento',checkAuth , participante.getParticipanteDoc);
router.get('/api/consultasGrupo/:grupo',checkAuth , participante.getParticipanteGru);
router.get('/api/consultasNombre/:nombre',checkAuth , participante.getParticipanteNom);
router.get('/api/consultasColegio/:colegio',checkAuth , participante.getParticipanteCol);
router.get('/api/consultas',checkAuth , participante.getParticipantes);
router.delete('/api/consultasborrarParticipante/:id',checkAuth , participante.borrarParticipantes);
router.post('/api/consultas/Descarga',checkAuth,descargas.descargarConsulta);
router.get('/api/consultasAcudiente/:acudiente',checkAuth , participante.getParticipanteAcu);

router.put('/api/editParticipante/:id/:campo/:valor',checkAuth, participante.editParticipante);
router.put('/api/asignacionGruposSet/:idGrupo/:documento',checkAuth, participante.asignarGrupo);
router.get('/api/asignacionGruposConsulta/:documento',checkAuth , participante.getParticipanteDoc);
router.post('/api/pruebas',checkAuth , participante.addGrupo);
router.post('/api/descargaParticipantes',checkAuth,descargas.descargaParticipantes)
//router.post('/api/participantesGrupo', participante.agregarGrupo);
 
router.put('/:id',checkAuth , participante.editParticipante);
// router.get('(api/modificar', (req, res) =>{
//   res.send("recibo de modificar");
// });

router.post('api/participantes/foto', checkAuth, participante.saveImage);

router.get('/api/preguntas',checkAuth , pregunta.getPregunta);
router.get('/api/preguntas/getPregunta',checkAuth , pregunta.getPregunta);
router.post('/api/preguntas/modificar/modificar-Agregar',checkAuth , pregunta.agregarPregunta);
router.delete('/api/preguntas/borrarPregunta/:id',checkAuth ,pregunta.borrarPregunta);


router.put('/api/cronogramaAgregar/:programa',checkAuth , cronograma.agregarActividad);
router.get('/api/getCronograma/:programa',checkAuth , cronograma.getCronograma);
router.delete('/api/borrarActividad/:actividad/:programa' ,checkAuth , cronograma.borrarActividad);


module.exports = router;
