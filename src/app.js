// import express from "express";
// const app = new express();  //Necessario instancia o express
// app.get("/", (req, res ) => {
//     res.status(200).send("Curso Node JS")
// })

import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';   //Sempre colocar o .js ao final da importação
import livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();  //armazenando a conexão

//Tratando erros de conxão com o BD Mongo
conexao.on("error", (erro) =>{
    console.error("Erro de Conexão com o Banco de Dados.", erro)    
});

//a biblioteca Mongoose, funciona como uma interface prase se conectar ao BD do Mongo
//então ela se conecta com a string de conexao e passa informação de retorno para o metodo Once.
conexao.once("open", (open) =>{
    console.log("Conexao feita com Sucesso!")
})

const app = express();
//Sem isso, não consegue adicionar objetos vindos de arra, para outro array ( recebe null )
app.use(express.json()) //Parametro de Body vem em String e precisa ser convertido para JSON. //Esse recurso é um Midleware: Executara qualquer parametro de tipo que chegue por meio do body, será 



//Acessando a Raiz do Site, apenas pra vericar rota
app.get("/", (req, res) => {        
    res.status(200).send("Curso de Node.js");
});

//Acesasndo as Coleções de Livros
//callback da função deve ser definida como assincrona. async antes do callback e await ao receber o conteudo da consulta na coleção pelo find. 
//O find é quem se conecta a coleção, busca e retorna tudo que ele encontrar por lá.
app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find();
    res.status(200).json(listaLivros);
    //res.status(200).json(livros)    
});


app.get("/livros/:id", (req, res) => {    
    const index = buscaLivrosPorId(req.params.id)
    res.status(200).json(livros[index]);
});


app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com Sucesso")
})

app.put("/livros/:id", (req, res) => {    
    const index = buscaLivrosPorId(req.params.id)
    livros[index].Titulo = req.body .Titulo
    res.status(200).json(livros[index]);
});

app.delete("/livros/:id", (req, res) => {    
    const index = buscaLivrosPorId(req.params.id)
    livros.splice(index, 1)
    res.status(201).send("Livro Deletado com Sucesso")
});

export default app


/* 

//Primeiro array de livros, simulando uma coleção de livros do MongoDB
const livros = [
    {
        id: 1,
        Titulo: "Senhor dos Aneis"
    },
    {
        id: 2,
        Titulo: "O Hobbit"
    }
]


// estava relacionada ao array
function buscaLivrosPorId(id){
    return livros.findIndex(livro => livro.id === Number(id) )
    //ou: 
    //return livros.findIndex(livro => { 
    //    return livro.id === Number(id) } 
    //)
}

*/