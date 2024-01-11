
import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{

  //Passando o erro por parametro, pra acessar o erro.errors
  constructor(erro){

    //Se tiver alguma mensagem personalizada no model, ele sobrescreverá a mensagem padrão, citando quais os campos não estão em conformidade.
    const mensagemDeErro = Object.values(erro.errors).map(erro => erro.message).join(";");   

    super(`Houve um Erro de Validação de dados. : ${mensagemDeErro}`);
  }
}

export default ErroValidacao;


