const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //Verifica el token que recibe del front-end para permitir acceso a las diferentes rutas de la api
try{
        var prior = req.headers.authorization.split(" ")[0];
        if(prior !== "2"){
            console.log("Fallo Authentificacion");
        }else{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "palabra_secreta_que_deberia_guardar_y_hashear_en_la_db");
        next();
        }
    }catch (error){
    res.status(401).json({
        message: "Fallo authentificacion P2"
    });
}
};