import { livros } from "../models/index.js";
import { autor } from "../models/index.js";   //Ao importar de scripts que não tem uma exportação DEFAULT, importar como se fosse um objeto, e extraindo somente a parte necessaria dele
//import autor from "../models/Autor.js";     //Se importar assim, daria erro

import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  //Em conexões com o banco de dados é sempre interessante utiliziar metodos asincronos para não alterar mesmo registro ao mesmo tempo.
  static listarLivros = async (req, res, next) => {   
    try {   
      const buscaLivros = livros.find(); //Auto Popular referencias. Passo 5: não é mais necessário popular autor, pois já foi adicionado o plugin mongoose, para popular dados de referencia, no modelo livros.js .populate("autor");   
      req.resultado = buscaLivros;
      
      next(); //chamando middleware de paginação e enviando resposta a requisição;

    }catch(e){
      next(e);
    }
      

  };

  static listarLivroPorId  = async (req, res, next) => {   
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);

      if(livroEncontrado){
        const livroResultado = await livros.findById(id, {}, { autopopulate: false });
        req.resultado = livroResultado;
        next();
        //res.status(200).json(livroEncontrado);
      }else{
        next(new NaoEncontrado("Livro não encontrado"));
      } 

    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
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
  
  // //Demonstração de Vinculo por embedding ; cadastro para recuperar informações do ID do livro citado no body. e passar as informações do Autor, no momento do cadastro.
  // //As informações dos vinculos, devem ser reorganizadas passando no spread operator({...atributoDoModel : variavelDeInsercaoDoMesmoTipo })
  // static cadastrarLivroPorEmbedding  = async (req, res, next) => {   
  //   const novoLivro = req.body; //Recuperando dados do livro pelo body, que contêm autor.
  //   try {
  //     const meuAutor =  await autor.findById(novolivros.autor);            //recuperando as Informações relativas a autor do Livro

  //     //Concatenando livro e autor pelo operador de espalhamento para puxar ou abrir todas as informações separadamente dentro do objeto livroCompleto
  //     //É passado o parametro meuautores._doc, pois ao retornar as informações do livro pelo MongoDb, ele retorna em outro formato, por isso, para valores de chave estrangeira, ao utilizar mongo, deve se utilizar a extensão ._doc, para recupar as informações;
  //     const livroCompleto = { ...novoLivro, autor: { ...meuAutor._doc }}; 
  //     const livroCriado = await livros.create(livroCompleto);
  //     res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
  //   } catch (erro) {
  //     next( erro ) ; 
  //     //res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
  //   }
  // };

    
  

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findById(id);
      if(livroEncontrado){
        await livros.findByIdAndUpdate(id, req.body);  
        res.status(200).json({ message: `Livro "${livroEncontrado.titulo}", foi atualizado com Sucesso!` });
      }else{
        next(new NaoEncontrado("Livro filtrado não foi encontrado"));
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
  
  static listarLivroPorFiltro = async (req, res, next) => {   

    try {

      const busca = await processaBusca(req.query);     //Teste: http://localhost:3000/livros/busca?minPaginas=100&maxPaginas=200&nomeAutor=Assis //http://localhost:3000/livros?pagina=1&campoOrdenacao=editora&ordem=1      
      //console.log(busca);
  
      if(busca !== null ){
        //callback da função deve ser definida como assincrona. async antes do callback e await ao receber o conteudo da consulta na coleção pelo find.       
        //const listaLivros = await livros.find({ editora : editoraQ}); //O find é quem se conecta a coleção, busca e retorna tudo que ele encontrar por lá.
        //const listaLivros = await livros.find(busca).populate("autor");   //populando pesquisa com os autores, já que estamos buscando o nome do autor, que não existe na "tabela" de livros.
        
        const listaLivros = livros.find(busca); //Auto Popular referencias. Passo 5: não é mais necessário popular autor, pois já foi adicionado o plugin mongoose, para popular dados de referencia, no modelo livros.js : livros.find(busca).populate("autor");
        req.resultado = listaLivros;        
        next();        //não precisa mais dessa linha(a frente) pois o middleware, registrado após em rotas, retornar a resposta já com a paginação.  res.status(200).json( listaLivros );
      }else{
        res.status(200).json( [] ); //Caso os filtros não encontrarem nada, retornar uma lista vazia ao invés de um erro.
      }

    } catch (erro) {
      next( erro ) ; 
      //res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };
  
}



async function processaBusca(parametros){  

  //const editoraQ = parametros.editora;
  //const regex = new RegExp(titulo, "i"); //forma 1 de utilizar o regex com case insensitive, isso permite buscar por partes da string, não ele exata.

  const { editora, titulo, minPaginas, maxPaginas , nomeAutor} = parametros;

  let busca = {}; //variavel que concateneara os filtros, se houverem.    
  //if (editora) busca.editora = editora; //se houver, concatena.
  //if (titulo) busca.titulo = titulo;

  //if (titulo) busca.titulo = regex;   //forma 1 de utilização de regex
  //if (titulo) busca.titulo = /aprendendo/;   //forma 2 de utilização de regex, de forma literal.
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };  // forma 3, por operadores de regex, o paramentro i de options significa uma busca independendo do capas lock  
  if (editora) busca.editora = editora; //não escrever assim, pois editora é campo enum: {$regex: editora, $options: "i" };   

  //adicionando novos filtros: 
  if ( minPaginas || maxPaginas ) busca.paginas = {};   //É NECESSARIO iniciar o campo paginas, se não dá erro interno no servidor : TypeError: Cannot set properties of undefined (setting '$gte')
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;
  //Erro: se escrever dessa forma, os atributos de min e max se sobrescreverão de acordo com quem vem por ultimo, não deixando concatenar outro filtro de paginas
  //if (minPaginas) busca.paginas = { $gte: minPaginas };  
  //if (maxPaginas) busca.paginas = { $lte: maxPaginas} ;  


  //Como o nome do autor não é uma informação presente na coleção de livros, foi necessário realizar mais uma consulta para a coleção de autores, pois lá é possível obter seu id e realizar corretamente o filtro na busca de livros.
  if(nomeAutor){    
    
    const nomeAutorRegex = {$regex : nomeAutor , $options: "i"};
    const autorObj = await autor.findOne( { nome: nomeAutorRegex } );

    if(autorObj !== null){
      busca.autor = autorObj._id;
    }else{
      
      busca = null;
    }         
  }
  
  //console.log( busca ); 

  return busca;
}


export default LivroController;



