import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase{
  constructor(mensagem = "Página Não Encontrada!"){
    super(mensagem, 404);
  }
}

export default NaoEncontrado;