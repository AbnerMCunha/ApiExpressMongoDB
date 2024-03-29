import mongoose from "mongoose";

//npm install mongoose-autopopulate //Auto Popular referencias. Passo 1: no terminal para instalar o auto-populate do mongoose;
import autopopulate from "mongoose-autopopulate"; //Auto Popular referencias. Passo 2: importar o auto-populate

//import {autorSchema } from "./Autor.js"; importação de embedding

//Schema: objeto de configuração que define a estrutura e as propriedades de um livro de uma entidade 
//(Como se fosse os atributos e definições de constraints de tabelas relacionais), 
const livroSchema = new mongoose.Schema(
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
        values : ["Classicos" , "JS"], 
        message : "Editora '{VALUE}' não é um valor permitido."
      } 
    },
    preco: { type: Number } ,
 
    //min: [10,  "O número de páginas deve estar entre 10 e 5000. Valor fonecido : {VALUE}"],
    //max: [5000 ,  "O número de páginas deve estar entre 10 e 5000.Valor fonecido : {VALUE}"],


    //VALIDATE e VALIDATOR: O validate não vai ser mais uma função, mas, sim, um objeto que envolverá o VALIDATOR, que é a função que realizará o retorno do valor para o objeto(que recebe o valor do campo (numeroPaginas neste caso) como argumento e retorna true se o valor for considerado válido, e false se não for. ), podemos adicionar uma propriedade message dentro de validate com a mensagem de erro personalizada.
    //Versão com message pesonalizada:
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    } 
    ,
    //autor :  { type: String } ,   //1. Sem vinculação de entidade no atributo string;
    //autor :  autorSchema          //2. Vinculação de Entidades/Modelos por Embbeding. Altera o Cadastro do Livro. na pratica, ele salva as informações do registro no momento do cadastro. se o objeto real posteriomente for alterado. pelo embedding, nos outros lugares que não tiver sido alterado. se manterá desatualizado.
    autor : { 
      type: mongoose.Schema.ObjectId, 
      ref: "autores", 
      required: [true, "O Nome do(a) Autor(a), é Obrigatório."], // 1 parametro, se refere a obrigatóriedade, o 2º é a Mensagem personalizada caso a condição não seja satizfeita.
      autopopulate: true //Auto Popular referencias. Passo 3: indicar no atributo, que irá auto-popular esta propriedade.
    }  //3. Vinculação de Entidades/Modelos Referencia. Não altera o cadastro do livro, mas sim a consulta. Só salva o id do registro e no momento de Consulta ele busca os dados atualizados. Referencing é o melhor.
  } , { versionKey: false }   //outro parametro padrão dos scremas é sobre o Versionamento interno do MongoDB
);

//Criação do Modelo: é a representação pratica do schema, é uma interface que permite à API interagir com os documentos de uma coleção. //  Ou seja, temos um modelo Livro como uma interface para que nossa API interaja com a coleção de livros que está no MongoDB.
//é o modelo que fornece para a API todos os métodos de que nós conseguiremos executar com o CRUD. O modelo é quem dirá à API que ela pode realizar o GET, o POST e a deleção de um livro.

//O 1º parametro "livros" é a string referente à coleção livros da Database do MongoDB,
//o 2º parametro é referente ao tipo de estrutura que será incorporado ao Modelo.


livroSchema.plugin(autopopulate); //Auto Popular referencias. Passo 4; exucutando o comando de popular com as ligações feitas no schema, como as informações de autor.
//Auto Popular referencias. Passo 5 : no livrosController, retirar await livros().populate("autor"), pois isso já será gerido pelo modelo.

const livros = mongoose.model("livros", livroSchema);    //criando um livro com o schema do tipo livroSchecma

//Models (modelos) e Schemas (esquemas) são conceitos que não são exclusivos do Mongoose. Eles estão relacionados a APIs e bancos de dados.

export default livros;


