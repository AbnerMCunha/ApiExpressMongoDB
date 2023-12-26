import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema( {
    id : { type : mongoose.Schema.Types.ObjectId },
    nome : {type : String} ,
    nacionalidade : { type : String }
    }, 
    {versionKey : false}
)

//1º parametro é o nome Associado a Coleção, geramente nomeada em PLURAL e em minusculo.
//2º paramtro é o tripo de estrutura que a coleção irá seguir.
const autor = mongoose.model("autores", AutorSchema);   //Uma instância de um modelo é chamada de documento.


//Exportando também o AutorSchema, para utilizar como base no Modelo de Livros, ao vincular o atributo Autor.
export { autor, AutorSchema }   //Como não irá passar somente 1 objeto, NÃO SE DEVE PASSAR "export DEFAULT {...}"  