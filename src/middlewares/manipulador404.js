
import NaoEncontrado from "../erros/NaoEncontrado.js";

//Reebendo 3 parametros pra repassar o erro de requisição para o manipulador de erros que sera invocado logo em seguida pelo app.
function manipulador404 (req, res, next){
  const erro404 = new NaoEncontrado();    //Chamo minha classe do erro personalizado.
  next(erro404);                          //Para centralizar o código, encaminho/delego o erro para o manipulador de erros, que sera o middleware invocado logo em seguida pelo app.
}

export default manipulador404;