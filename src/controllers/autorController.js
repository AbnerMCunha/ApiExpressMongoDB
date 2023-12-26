import {autor} from "../models/Autor.js";


class AutorController{

    static async cadastrarAutor(req, res){
        try{
            const meuAutor = await autor.create(req.body)
            res.status(201).send({message : `Autor cadastrado com Sucesso!` , autor : meuAutor })
        }catch(e){
            res.status(500).send({message : `Erro ao Cadastrar Autor ${e.message}`})
        }
    }

    static async listarAutores(req, res){
        try{
            const lista = await autor.find({});
            res.status(200).json(lista);
        }catch(erro ) {
            res.status(500).send( { message: `Falhar na Requisição de Autores : ${erro.message}`})
        }
    };    

    static async listarAutorPorId(req, res){

        try{
            const meuAutor = await autor.findById(req.params.id);
            res.status(200).json(meuAutor)

        }catch( e ){
            res.status(500).send({message:`Erro ao consultar autor : ${e.message} `})
        }
    }

    static async atualizarAutor(req,res){
        try{            
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body )
            res.status(201).json( {message : `Autor Atualizado com Sucesso!! `})            

        }catch(e){
            res.status(500).send({ message : `Erro ao alterar Autor ${e.message}`})
        }    
    }

    static async deletarAutor(req,res){
        try{
            const id = req.params.id;
            const meuAutor = await autor.findByIdAndDelete(id)
            res.status(201).json( {message : `Autor Deletado com Sucesso!! `})            

        }catch(e){
            res.status(500).send({ message : `Erro ao Deletar Autor ${e.message}`})
        }    
    }



}

export default AutorController;