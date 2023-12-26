import livro from "../models/Livro.js"

import { autor } from "../models/Autor.js";   //Ao importar de scripts que não tem uma exportação DEFAULT, importar como se fosse um objeto, e extraindo somente a parte necessaria dele
//import autor from "../models/Autor.js";     //Se importar assim, daria erro

class LivroController {

  //Em conexões com o banco de dados é sempre interessante utilziar metodos asyncronos para não alterar mesmo registro ao mesmo tempo.

  //Fazendo uma busca/pesquisa por Editora. Exemplo: http://localhost:3000/livros?editora=Classicos
  static async listarLivrosPorEditora (req, res) {
    const editoraQ = req.query.editora    
    try {
      //callback da função deve ser definida como assincrona. async antes do callback e await ao receber o conteudo da consulta na coleção pelo find.       
      const listaLivros = await livro.find({ editora : editoraQ}); //O find é quem se conecta a coleção, busca e retorna tudo que ele encontrar por lá.
      res.status(200).json(listaLivros );
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarLivros (req, res) {
    try {      
      //const listaLivros = await livro.find({});       //recebendo autor por embedding

      //Recebendo por Referencia ao invés de embbeding
      //Quando usamos references o autor não faz mais parte do objeto livro. Assim, cada livro deve ser “populado” com as referências do autor.
      //.populate("autor").exec()
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros );
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarLivroPorId (req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  };
  
  //Demonstração de Vinculo por embedding ; cadastro para recuperar informações do ID do livro citado no body. e passar as informações do Autor, no momento do cadastro.
  //As informações dos vinculos, devem ser reorganizadas passando no spread operator({...atributoDoModel : variavelDeInsercaoDoMesmoTipo })
    static async cadastrarLivroPorEmbedding (req, res) {
    const novoLivro = req.body; //Recuperando dados do livro pelo body, que contêm autor.
    try {
      const meuAutor =  await autor.findById(novoLivro.autor);            //recuperando as Informações relativas a autor do Livro

      //Concatenando livro e autor pelo operador de espalhamento para puxar ou abrir todas as informações separadamente dentro do objeto livroCompleto
      //É passado o parametro meuAutor._doc, pois ao retornar as informações do livro pelo MongoDb, ele retorna em outro formato, por isso, para valores de chave estrangeira, ao utilizar mongo, deve se utilizar a extensão ._doc, para recupar as informações;
      const livroCompleto = { ...novoLivro, autor: { ...meuAutor._doc }}; 
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  //Demonstração utilziando o Vinculo por Referencia; no cadastro não se muda nada.
  static async cadastrarLivroPorReferencing (req, res) {    
    try {
      const livroCriado = await livro.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }
    
  

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
};

export default LivroController;
