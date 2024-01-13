import { livros } from "../models/index.js";
import { autor } from "../models/index.js";   //Ao importar de scripts que não tem uma exportação DEFAULT, importar como se fosse um objeto, e extraindo somente a parte necessaria dele
//import autor from "../models/Autor.js";     //Se importar assim, daria erro

import NaoEncontrado from "../erros/NaoEncontrado.js";
//import ErroValidacao from "../erros/ErroValidacao.js";
//import mongoose from "mongoose";

class LivroController {

  //Em conexões com o banco de dados é sempre interessante utilziar metodos asyncronos para não alterar mesmo registro ao mesmo tempo.

  //Fazendo uma busca/pesquisa por Editora. Exemplo: http://localhost:3000/livros?editora=Classicos
  static listarLivrosPorEditora = async (req, res, next) => {   
    const editoraQ = req.query.editora;    
    try {
      //callback da função deve ser definida como assincrona. async antes do callback e await ao receber o conteudo da consulta na coleção pelo find.       
      const listaLivros = await livros.find({ editora : editoraQ}); //O find é quem se conecta a coleção, busca e retorna tudo que ele encontrar por lá.
      res.status(200).json(listaLivros );
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static listarLivros = async (req, res, next) => {   
    try {      

      //Testando o Manipulador de Erros.:
      //throw new ErroValidacao() ; //throw new NaoEncontrado(); // mongoose.Error.ValidationError ;//mongoose.Error.CastError(); //ErroBase(); //Error();

      //const listaLivros = await livros.find({});       //Se fosse receber autor por embedding
      //Recebendo por Referencia ao invés de embbeding
      //Quando usamos references o autor não faz mais parte do objeto livros. Assim, cada livro deve ser “populado” com as referências do autor.
      //.populate("autor").exec()
      const listaLivros = await livros.find({}).populate("autor").exec();
      res.status(200).json(listaLivros );
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static listarLivroPorId  = async (req, res, next) => {   
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);

      if(livroEncontrado){
        res.status(200).json(livroEncontrado);
      }else{
        next(new NaoEncontrado("Livro não encontrado"));
      } 

    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  };
  
  //Demonstração de Vinculo por embedding ; cadastro para recuperar informações do ID do livro citado no body. e passar as informações do Autor, no momento do cadastro.
  //As informações dos vinculos, devem ser reorganizadas passando no spread operator({...atributoDoModel : variavelDeInsercaoDoMesmoTipo })
  static cadastrarLivroPorEmbedding  = async (req, res, next) => {   
    const novoLivro = req.body; //Recuperando dados do livro pelo body, que contêm autor.
    try {
      const meuAutor =  await autor.findById(novolivros.autor);            //recuperando as Informações relativas a autor do Livro

      //Concatenando livro e autor pelo operador de espalhamento para puxar ou abrir todas as informações separadamente dentro do objeto livroCompleto
      //É passado o parametro meuautores._doc, pois ao retornar as informações do livro pelo MongoDb, ele retorna em outro formato, por isso, para valores de chave estrangeira, ao utilizar mongo, deve se utilizar a extensão ._doc, para recupar as informações;
      const livroCompleto = { ...novoLivro, autor: { ...meuAutor._doc }}; 
      const livroCriado = await livros.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  };

  //Demonstração utilziando o Vinculo por Referencia; no cadastro não se muda nada.
  static cadastrarLivroPorReferencing  = async (req, res, next) => {    
    try {
      const livroCriado = await livros.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  };
    
  

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findById(id);
      if(livroEncontrado){
        await livros.findByIdAndUpdate(id, req.body);  
        res.status(200).json({ message: "livro atualizado" });
      }else{
        next(new NaoEncontrado("Livro não encontrado"));
      } 
      
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findById(id);
      if(livroEncontrado){
        await livros.findByIdAndDelete(id);
        res.status(200).json({ message: "livro excluído com sucesso" });
      }else{
        next(new NaoEncontrado("Livro não encontrado"));
      } 
      
    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

  //formato de função normal, ao inves de callback
  // static async excluirLivro (req, res) {
  //   try {
  //     const id = req.params.id;
  //     await livros.findByIdAndDelete(id);
  //     res.status(200).json({ message: "livro excluído com sucesso" });
  //   } catch (erro) {
  //     res.status(500).json({ message: `${erro.message} - falha na exclusão` });
  //   }
  // }

}

export default LivroController;
