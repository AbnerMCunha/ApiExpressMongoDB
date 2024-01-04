//Construindo um servidor web usando o framework Express em Node.js, conectando-se a um banco de dados MongoDB, e definindo rotas para o servidor.

//Sempre colocar o .js ao final da importação dos scripts 

import express from "express";                              //É o módulo principal do Express, utilizado para criar e configurar um aplicativo web.
import conectaNaDatabase from "../src/config/dbConnect.js";  //Importando a função de conexão com o BD do MongoDB
import routes from "./routes/index.js";                      //importado do arquivo index.js, Um módulo que contém as definições de rotas para o aplicativo.
import ManipuladorDeErros from "./middlewares/ManipuladorDeErros.js";

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

//A função routes é chamada passando a instância do aplicativo app. Isso configura as rotas definidas no arquivo index.js para o aplicativo.
routes(app);     

//Utilizando Middleware de tratamento de Erros.
app.use( ManipuladorDeErros );

export default app; //O aplicativo Express configurado é exportado para que possa ser utilizado em outros arquivos.

