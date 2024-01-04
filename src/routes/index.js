//Esse index será, literalmente, o ponto de entrada das rotas, e é esse ponto de entrada que o resto da aplicação acessará.

import express from "express";                      //Importando o Express para utilizar o parametro app em routes, que é uma const express vinda do app.js;
import Rotalivros from "../routes/livrosRoutes.js";  //Rotalivros São as nossas rotas que estão sendo exportadas e importadas de livrosRoutes
import autores from "./autorRoutes.js";             //Importando a rota de Autores para a definição/configuração de rotas pelo express.routes

//Criação de Middlewares
//É função routes recebendo o parâmetro app, que é a instância do aplicativo Express a ser configurado.
const routes = (app) =>{
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js")); //Definindo já a resposta da requisição da Raiz.

  //.use é utilizado para incluir middlewares como o express.json, que permite ao aplicativo entender dados JSON na solicitação.
  //junto dele esta sendo passado todas as rotas utilizadas no site.
  //A partir disso, o Express conseguirá gerenciar tudo de uma vez.
  //Comisso delegamos para o index definir os caminhos de rotas especificas a serem utilizadas, de forma mais organizada, para o nossa aplicação        
  app.use(express.json(), Rotalivros, autores);    
};

export default routes;
