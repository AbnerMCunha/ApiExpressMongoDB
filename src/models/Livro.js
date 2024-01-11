import mongoose from "mongoose";
//import {autorSchema } from "./Autor.js"; importação de embedding

//Schema: objeto de configuração que define a estrutura e as propriedades de um livro de uma entidade 
//(Como se fosse os atributos e definições de constraints de tabelas relacionais), 
const livroSchecma = new mongoose.Schema(
  {   //Atributos do Model devem ser em MINUSCULO. Caso contrário dará erro.
    //a propriedade type, se refere ao tipo do dado. Ela receberá um mongoose.Schema.Types.  

    id: { type: mongoose.Schema.Types.ObjectId },     //ObjectId é um tipo do MongoDB, usado para a criação de IDs únicos.
    //1º jeito titulo: {type: mongoose.Schema.Types.String }   //Exemplo extenso para definir uma string
    //2º jeito + simples, definindo com S de String, em Maiusculo:
    titulo: {type: String , required: [true, "O Titulo é Obrigatório."]}, // required: true, o que significa que a propriedade titulo é obrigatória, 2º parametro do array é a mensagem personalizada  de validação.
    editora: { 
      type: String ,
      //Enum: opções limitadas e especificas já predefinidas.
      //enum: ["C#" , "JS"]   //Verão simples
      //Versão com mensagem personalizada
      enum: { 
        values : ["C#" , "JS"], 
        message : "Editora '{VALUE}' não é um valor permitido."
      } 
    },
    preco: { type: Number } ,
    paginas: { 
      type: Number ,
      //min: [10,  "O número de páginas deve estar entre 10 e 5000. Valor fonecido : {VALUE}"],
      //max: [5000 ,  "O número de páginas deve estar entre 10 e 5000.Valor fonecido : {VALUE}"],

      //Versão com message pesonalizada:
      numeroPaginas: {
        type: Number,
        validate: {
          validator: (valor) => {
            return valor >= 10 && valor <= 5000;
          },
          message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
        }
      } 
    },
    //autor :  { type: String } ,   //1. Sem vinculação de entidade no atributo string;
    //autor :  autorSchema          //2. Vinculação de Entidades/Modelos por Embbeding. Altera o Cadastro do Livro. na pratica, ele salva as informações do registro no momento do cadastro. se o objeto real posteriomente for alterado. pelo embedding, nos outros lugares que não tiver sido alterado. se manterá desatualizado.
    autor : { type: mongoose.Schema.ObjectId, ref: "autores", 
      required: [true, "O Nome do(a) Autor(a), é Obrigatório."] // 1 parametro, se refere a obrigatóriedade, o 2º é a Mensagem personalizada caso a condição não seja satizfeita.
    }  //3. Vinculação de Entidades/Modelos Referencia. Não altera o cadastro do livro, mas sim a consulta. Só salva o id do registro e no momento de Consulta ele busca os dados atualizados. Referencing é o melhor.
  } , { versionKey: false }   //outro parametro padrão dos scremas é sobre o Versionamento interno do MongoDB
);

//Criação do Modelo: é a representação pratica do schema, é uma interface que permite à API interagir com os documentos de uma coleção. //  Ou seja, temos um modelo Livro como uma interface para que nossa API interaja com a coleção de livros que está no MongoDB.
//é o modelo que fornece para a API todos os métodos de que nós conseguiremos executar com o CRUD. O modelo é quem dirá à API que ela pode realizar o GET, o POST e a deleção de um livro.

//O 1º parametro "livros" é a string referente à coleção livros da Database do MongoDB,
//o 2º parametro é referente ao tipo de estrutura que será incorporado ao Modelo.
const livro = mongoose.model("livros", livroSchecma);    //criando um livro com o schema do tipo livroSchecma

//Models (modelos) e Schemas (esquemas) são conceitos que não são exclusivos do Mongoose. Eles estão relacionados a APIs e bancos de dados.

export default livro;


