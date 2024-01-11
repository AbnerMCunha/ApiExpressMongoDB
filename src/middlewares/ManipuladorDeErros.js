
import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

//Criando Middleware de Tratamento de Erros Personalizado.
//Ao comentar linha abaixo o eslint entende que não será utilizado algumas das variaveis definida abaixo, no caso é o next : 
// eslint-disable-next-line no-unused-vars
function ManipuladorDeErros(erro, req, res, next){

  console.log(erro);  // imprime o erro para a pessoa desenvolvedora

  if( erro instanceof mongoose.Error.CastError ){      
    //é um tipo de erro lançado pelo Mongoose quando ele falha em converter um valor, ObjectId deve ser uma sequência de 12 ou 24 caracteres hexadecimais. Se o método findById receber uma string que não cumpre esses requisitos, ele falhará em converter a string para o tipo ObjectId e lançará um CastError
    
    //Antes da Refatoração: res.status(400).send({message:"Requisição Incorreta: Um ou Mais dados Fornecidos estão Incorretos."});  //Na rota de buscar um autor pelo seu ID, identificamos os casos em que: o dado foi fornecido de forma incorreta (código de status 400)
    new RequisicaoIncorreta().enviarResposta(res);  //Após Refatoração: 

  }
  else if( erro instanceof mongoose.Error.ValidationError){
    //Erro de validação ao passar algum parametro de requisição incorreta.

    //Antes da Refatoração: 
    //const mensagemDeErro = Object.values(erro.errors).map(erro => erro.message).join(";");   //Se tiver alguma mensagem personalizada no model, ele sobrescreverá a mensagem padrão, citando quais os campos não estão em conformidade.
    //res.status(400).send({ message : `Houve um Erro de Validação de dados. : ${mensagemDeErro}` });

    //new ErroValidacao(erro).enviarResposta(res);
    new ErroValidacao(erro).enviarResposta(res);  //Passando o parametro do Erro para ser tratado de forma personalizada.

  }
  else if( erro instanceof NaoEncontrado){

    //Erro de definição de Rota, redirecionando para pagina não encontrada.    
    erro.enviarResposta(res) ;    //Se erro for instancia de Nao Encontrado, o erro pode acessar os atributos da classe nao encontrado tambem.

  }else{
    //Não sendo nenhum dos casos especificos acima, jogo o erro genenrico de servidor.

    //Antes da Refatoração: res.status(500).send({message:"Erro Interno do Servidor."});  //os erros de servidor podem ser mais específicos, mas o código de status 500 é o mais genérico e engloba todos eles. 
       
    //Após Refatoração: erro padronizado invocado, e repassando a resposta do erro tratado.
    new ErroBase().enviarResposta(res); 
  }    
}

export default ManipuladorDeErros;
