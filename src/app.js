import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

const db = await conectaNaDatabase();  // estabelecendo a conexão  //await indica que a operação é assíncrona e deve aguardar a conclusão antes de continuar.


db.on("error", console.log.bind(console, "Erro de conexão"));

db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

//Execução das Rotas registradas pelo Index, passando a aplicacao express como parametro. 
//Ele vai verificar se a requisição bate com algum verbo das rota raiz(/), da rota de livros e autores 
routes(app);              //Se não encontrar nenhuma rota compativel ele lança, por default, uma pagina html de erro.
app.use(manipulador404);  //Registrando a função, que só será ativada se nenhuma rota espeficada "Nao foi Encontrada". Ela pode ser invocada dentro de qualquer verbo de rota especidicada anterioremente, pela linearidade.

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;


/*

//Construindo um servidor web usando o framework Express em Node.js, conectando-se a um banco de dados MongoDB, e definindo rotas para o servidor.

//Sempre colocar o .js ao final da importação dos scripts 

import express from "express";                              //É o módulo principal do Express, utilizado para criar e configurar um aplicativo web.
import conectaNaDatabase from "../src/config/dbConnect.js";  //Importando a função de conexão com o BD do MongoDB
import routes from "./routes/index.js";                      //importado do arquivo index.js, Um módulo que contém as definições de rotas para o aplicativo.

import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js"; 


const conexao = await conectaNaDatabase();  // estabelecendo a conexão  //await indica que a operação é assíncrona e deve aguardar a conclusão antes de continuar.


//On e Once são métodos para trabalhar com eventos de conexão, solicitação HTTP, entre outros. São fornecidos pelo EventEmitter, um módulo principal no Node.js 

//O método on é usado para registrar um ouvinte de eventos para um evento específico.
//No caso, esta tratando erros de conxão com o BD Mongo, com o evento "error"
conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

//O método once é semelhante ao on, mas o once será chamado SOMENTE 1 vez para o evento especificado.
//Com o Evento Open, então se conecta com a string de conexao do BD e passa informação de retorno para o metodo Once.
conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});


//Um aplicativo Express é criado chamando a função express(), a instância resultante é armazenada na variável app.
const app = express();

app.use(express.json());

//A função routes é chamada passando a instância do aplicativo app. Isso configura as rotas definidas no arquivo index.js para o aplicativo.
routes(app);     

app.use(manipulador404);

//Utilizando Middleware de tratamento de Erros.
app.use( manipuladorDeErros );


export default app; //O aplicativo Express configurado é exportado para que possa ser utilizado em outros arquivos.


*/