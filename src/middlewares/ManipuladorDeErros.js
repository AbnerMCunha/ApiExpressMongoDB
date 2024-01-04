
import mongoose from "mongoose";

//Criando Middleware de tratamento de Erros.
//Ao comentar linha abaixo o eslint entende que não será utilizado algumas das variaveis definida abaixo, no caso é o next : 
// eslint-disable-next-line no-unused-vars
function ManipuladorDeErros(erro, req, res, next){

  console.log(erro);  // imprime o erro para a pessoa desenvolvedora

  if( erro instanceof mongoose.Error.CastError ){  //é um tipo de erro lançado pelo Mongoose quando ele falha em converter um valor, ObjectId deve ser uma sequência de 12 ou 24 caracteres hexadecimais. Se o método findById receber uma string que não cumpre esses requisitos, ele falhará em converter a string para o tipo ObjectId e lançará um CastError
    res.status(400).send({message:"Um ou Mais dados Fornecidos estão Incorretos."});  //Na rota de buscar um autor pelo seu ID, identificamos os casos em que: o dado foi fornecido de forma incorreta (código de status 400)
  }
  else if( erro instanceof mongoose.Error.ValidationError){
    const mensagemDeErro = Object.values(erro.errors).map(erro => erro.message).join(";");   //Se tiver alguma mensagem personalizada no model, ele sobrescreverá a mensagem padrão, citando quais os campos não estão em conformidade.
    res.status(401).send({ message : `Houve um Erro de Validação de dados. : ${mensagemDeErro}` });
  }
  else{
    res.status(500).send({message:"Erro Interno do Servidor."});  //os erros de servidor podem ser mais específicos, mas o código de status 500 é o mais genérico e engloba todos eles.
  }    
}

export default ManipuladorDeErros;