import mongoose from "mongoose";

//Schema: objeto de configuração que define a estrutura e as propriedades de um livro de uma entidade 
//(Como se fosse os atributos e definições de constraints de tabelas relacionais), 
const LivroSchecma = new mongoose.Schema(
    {

        //a propriedade type, se refere ao tipo do dado. Ela receberá um mongoose.Schema.Types.  

        id: { type: mongoose.Schema.Types.ObjectId },     //ObjectId é um tipo do MongoDB, usado para a criação de IDs únicos.
        //titulo: {type: mongoose.Schema.Types.String }   //Exemplo extenso para definir uma string
        titulo: {type: String , required : true }, //exemplo simples, definir com S de String, em Maiusculo, required: true, o que significa que a propriedade titulo é obrigatória.
        editora: { type: Number } ,
        Preco: { type: Number } ,
        Paginas: { type: Number } ,
    }
    , { versionKey: false }   //outro parametro padrão dos scremas é sobre o Versionamento interno do MongoDB
)


//Criação do Modelo: é a representação pratica do schema, é uma interface que permite à API interagir com os documentos de uma coleção. //  Ou seja, temos um modelo Livro como uma interface para que nossa API interaja com a coleção de livros que está no MongoDB.
//é o modelo que fornece para a API todos os métodos de que nós conseguiremos executar com o CRUD. O modelo é quem dirá à API que ela pode realizar o GET, o POST e a deleção de um livro.

//O 1º parametro "livros" é a string referente à coleção livros da Database do MongoDB,
//o 2º parametro é referente ao tipo de estrutura que será incorporado ao Modelo.
const livro = mongoose.model("livros", LivroSchecma)    //criando um livro com o schema do tipo LivroSchecmass

//LivroSchecma.add(livro) //que exporta o modelo livro para que possa ser usado pelo restante da aplicação.

//Models (modelos) e Schemas (esquemas) são conceitos que não são exclusivos do Mongoose. Eles estão relacionados a APIs e bancos de dados. Você encontrará muitos tipos diferentes de modelos e esquemas para vários tipos de conexão com o banco enquanto estiver criando suas APIs. No caso do Mongoose, isso é a maneira que ele tem de definir um esquema e um modelo.

export default livro;