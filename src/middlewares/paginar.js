import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";


//Função de Paginação dos verbos de consulta da API. serve para todas as rotas(livros e autores)
async function paginar(req, res, next){

  try{        
    let {limite = 5 , pagina = 1, ordenacao = "_id:-1" } = req.query;    //http://localhost:3000/livros?pagina=2  //http://localhost:3000/autores?pagina=2
    
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
    
    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        //.populate("autor")    //Desnecessário pelo autopopulate do modelo livros.
        .exec();

      res.status(200).json(resultadoPaginado);
    }else{
      next( new RequisicaoIncorreta() );  //Encaminhando para o Manipulador de Erros 
    }      

  } catch (erro) {
    next( erro ) ; 
    //res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }

}

export default paginar;