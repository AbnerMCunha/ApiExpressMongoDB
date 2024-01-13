import mongoose from "mongoose";

//console.log("Passei por aqui");  teste para verificar se ele sempre será executado ao instanciar o index.js

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
  //message: () => `Um campo foi fornecido em branco.`  //Sem utilizar parametros
});

//a configuração do validadorGlobal.js está centralizada e é automaticamente aplicada para todos os campos de tipo String em todos os modelos, graças ao uso do mongoose.Schema.Types.String.set.