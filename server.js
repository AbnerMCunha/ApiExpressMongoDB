//import http from 'http' //Importando a biblioteca nativa(/interna) do Node; ao chamar no topo do arquivo, o Node já acessa os dados dessa biblioteca.

import "dotenv/config"  ;//import env from "env"
import app from "./src/app.js";


const port = process.env.PORT || 3000 ;  //Porta

app.listen(port, () => {
  console.log("servidor escutando!");
});


//consumo de rotas:
//Forma 1, mais simples: definido explicitamente em end, o conteúdo da página.
// const server = http.createServer(( req, res ) =>{
//     res.writeHead(200, { "Content-Type": "text/plain" });   //Este método é referente ao cabeçalho (ou header) da requisição HTTP.  //Toda comunicação HTTP, tanto a requisição quanto a resposta, tem cabeçalhos. Os cabeçalhos contêm todas as informações necessárias para que a comunicação funcione corretamente.// Nele há informações contidas como: o Host para o qual a requisição é feita; o User-Agent, que designa quem faz a requisição, podendo ser um navegador, o Curl (programa de terminal) ou o Postman, por exemplo; e o tipo de dado aceito na requisição (Accept), que nesse caso, pode ser texto ou JavaScript.
//     res.end("Curso de Node.js")
// });
//Forma 2 de consumo de rotas:utilizando o contexto da url passado, definido em end,  para utilizado no conteudo da paginá da rota.
// const rotas = {
//     "/": "Curso de Express API",
//     "/livros": "Entrei na rota livros",
//     "/autores": "Entrei na rota autores"
// };  
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(rotas[req.url]);
// });

// //O método listen é o que vai definir o endereço no qual o servidor vai ficar escutando as requisições e geralmente já o chamamos depois do servidor estar criado
// server.listen(port , () => 
//     console.log("Servidor Escutando!")
// )

