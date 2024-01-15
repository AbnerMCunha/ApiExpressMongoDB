//Rotas de Livros com as Operações em CRUD

import express from "express";  //módulo principal do Express, pra criar e configurar rotas.
import LivroController from "../controllers/livrosController.js";    //Um controlador que contém métodos para lidar com as operações relacionadas a livros.

const routes = express.Router();    // Cria um objeto Router do Express que pode ser usado para definir rotas.

//Definição de Rotas:
routes.get("/livros", LivroController.listarLivros);                    //http://localhost:3000/livros        
routes.get("/livros/busca", LivroController.listarLivroPorFiltro);    //http://localhost:3000/livros/busca?editora=Classicos
routes.get("/livros/:id", LivroController.listarLivroPorId);            //http://localhost:3000/livros/657bbb0c37338579afda5204
routes.post("/livros", LivroController.cadastrarLivroPorReferencing);   //Demonstrado as diferenças de vinvulação de collections por Embbeding e Referencing
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;
