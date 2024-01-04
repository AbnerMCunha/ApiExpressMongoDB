//import mongoose from "mongoose";  //Import para tratamento de Erros com o mongoose.Error.CastError
import {autor} from "../models/Autor.js";


class AutorController{

  static cadastrarAutor =  async (req, res, next)=>{
    try{
      const meuAutor = await autor.create(req.body);
      res.status(201).send({message : "Autor cadastrado com Sucesso!" , autor : meuAutor });
    }catch(erro){
      next(erro) ; //res.status(500).send({message : `Erro ao Cadastrar Autor ${erro.message}`});
    }
  };

  static listarAutores = async(req, res, next) => {
    try{
      const lista = await autor.find({});
      res.status(200).json(lista);
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
        res.status(404).send({message:"Erro ao consultar id do autor."});   //o dado foi fornecido de forma correta, mas não havia nenhuma correspondência no banco de dados (código de status 404)
      }     
    }catch( erro ){
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try{            
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body );
      res.status(201).json( {message : "Autor Atualizado com Sucesso!! "});            

    }catch(erro){
      next(erro) ; //res.status(500).send({ message : `Erro ao alterar Autor ${erro.message}`});
    }    
  };

  static deletarAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(201).json( {message : "Autor Deletado com Sucesso!! "});            

    }catch(erro){
      next(erro) ; //res.status(500).send({ message : `Erro ao Deletar Autor ${erro.message}`});
    }    
  };

}

export default AutorController;