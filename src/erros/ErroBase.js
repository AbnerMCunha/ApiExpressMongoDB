
//classe extendida Error, é nativa do JavaScript e possui propriedades nativas como mensagem e status. 
//isso padroniza as respostas de erro que mandamos ao front-end, além de reduzir o código do manipulador de erros.
class ErroBase extends Error {
  //Passando os maramestro default: mensagem e status
  constructor(mensagem = "Erro interno do servidor", status = 500) {
    super();  //é obrigatório ao herdar classe. super() é usado para chamar o construtor da classe pai e garantir que a inicialização adequada seja feita antes de adicionar qualquer lógica específica da classe filha.
    this.message = mensagem;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status
    });
  }
}

export default ErroBase;

