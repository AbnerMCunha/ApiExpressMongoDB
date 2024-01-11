import mongoose from "mongoose";

const autorSchema = new mongoose.Schema( {
  id : { type : mongoose.Schema.Types.ObjectId },
  nome : { type : String , required: [true, "O Nome do(a) Autor(a) é Obrigatório."]} ,
  nacionalidade : { type : String }
}, 
{versionKey : false}
);

//1º parametro é o nome Associado a Coleção, geramente nomeada em PLURAL e em minusculo.
//2º paramtro é o tripo de estrutura que a coleção irá seguir.
const autor = mongoose.model("autores", autorSchema);   //Uma instância de um modelo é chamada de documento.


//Exportando também o autorSchema, para utilizar como base no Modelo de Livros, ao vincular o atributo Autor.
export { autor, autorSchema };   //Como não irá passar somente 1 objeto, NÃO SE DEVE PASSAR "export DEFAULT {...}"  