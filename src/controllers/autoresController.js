//import mongoose from "mongoose";  //Import para tratamento de Erros com o mongoose.Error.CastError
import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autor} from "../models/index.js";


//nota:dentro de funções assíncronas, que é o caso dos métodos de controladores que estamos trabalhando, a função next deve ser obrigatoriamente utilizada para encaminhar qualquer erro que foi criado ou que tenha sido lançado e capturado com o bloco try...catch.

class AutorController{

  static cadastrarAutor =  async (req, res, next)=>{
    try{
      const meuAutor = await autor.create(req.body);
      res.status(201).send({message : "Autor cadastrado com Sucesso!" , autores : meuAutor });
    }catch(erro){
      next(erro) ; //res.status(500).send({message : `Erro ao Cadastrar Autor ${erro.message}`});
    }
  };

  static listarAutores = async(req, res, next) => {
    try{
      // const buscaLivros = livros.find();   
      // req.resultado = buscaLivros;
      // req.origem = "livros";
      // next();

      const lista =  autor.find();
      req.resultado = lista;
      req.origem = "autores";      
      next();
      //res.status(200).json(lista);
    }catch( erro ) {
      next( erro ) ; //res.status(500).send( { message: `Falhar na Requisição de Autores : ${erro.message}`});
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try{
      const meuAutor = await autor.findById(req.params.id);
      if(meuAutor){
        res.status(200).json(meuAutor); //Sucesso na requisicao
      }else{
        next(new NaoEncontrado("Id do Autor não Encontrado!"));               //2. Utilizando a classe de erros criada.: Todo middleware tem acesso à função next, que pode ser utilizada para executar o próximo middleware registrado na aplicação ou para executar diretamente o manipulador de erros quando recebe um erro como parâmetro.
        //res.status(404).send({message:"Erro ao consultar id do autor."});   //1. o dado foi fornecido de forma correta, mas não havia nenhuma correspondência no banco de dados (código de status 404)
      }     
    }catch( erro ){
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try{            
      const id = req.params.id;      
      const meuAutor = await autor.findByIdAndUpdate(id, req.body );
      if(meuAutor){        
        res.status(201).json( {message : "Autor Atualizado com Sucesso!! "});
      }else{
        next(new NaoEncontrado("Id do Autor não Encontrado!"));               //2. Utilizando a classe de erros criada.: Todo middleware tem acesso à função next, que pode ser utilizada para executar o próximo middleware registrado na aplicação ou para executar diretamente o manipulador de erros quando recebe um erro como parâmetro.
        //res.status(404).send({message:"Erro ao consultar id do autor."});   //1. o dado foi fornecido de forma correta, mas não havia nenhuma correspondência no banco de dados (código de status 404)
      }                 

    }catch(erro){
      next(erro) ; //res.status(500).send({ message : `Erro ao alterar Autor ${erro.message}`});
    }    
  };

  static deletarAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const meuAutor = await autor.findByIdAndDelete( id );
      if(meuAutor){        
        res.status(201).json( {message : "Autor Deletado com Sucesso!! "});            
      }else{
        next(new NaoEncontrado("Id do Autor não Encontrado!"));               //2. Utilizando a classe de erros criada.: Todo middleware tem acesso à função next, que pode ser utilizada para executar o próximo middleware registrado na aplicação ou para executar diretamente o manipulador de erros quando recebe um erro como parâmetro.
        //res.status(404).send({message:"Erro ao consultar id do autor."});   //1. o dado foi fornecido de forma correta, mas não havia nenhuma correspondência no banco de dados (código de status 404)
      }           
      
    }catch(erro){
      next(erro) ; //res.status(500).send({ message : `Erro ao Deletar Autor ${erro.message}`});
    }    
  };

}

export default AutorController;