import mongoose from "mongoose";

//string de contexão mongoose: mongodb+srv://admin:<password>@cluster0.em8fsdi.mongodb.net/?retryWrites=true&w=majority
//Colocando a string de conexão dentro do metodo connect do mongoose.
//alterar a <password> para a senha da database ( ou conexão, verificar)
//É possivel censurar partes do código ao subir p/ o github, com VARIAVEIS DE AMBIENTE:
//VARIAVEIS DE AMBIENTE: são utilizadas para esconder dados sensiveis da aplicação, como senhas de conexão de banco de dados da empresa. Para isso siga:
//1. Instalar o .env que é onde se declara VARIAVEIS DE AMBIENTE. no terminal deve ser executado:
// Exemplo: npm instal dotenv
//2. Criar arquivo .env , na raiz do projeto, no mesmo, nível do .gitignore.
//2.1 declarar o nome da variavél, recomendado é em CAPS LOCK, seguido de "="(igual), concatenando com a variavel de ambiente, sem aspas:
// Exemplo: DB_CONNECTION_STRING=mongodb+srv://admin:MINHASENHA@cluster0.em8fsdi.mongodb.net/livraria?retryWrites=true&w=majority
//3. No arquivo de conexão(dbConnect.js), defina no metodo connect do mongoose, dentro do parenteses, a variavel de ambiente.
//Exemplo: mongoose.connect(process.env.DB_CONNECTION_STRING);
//4. Adicionar o arquivo .env no .gitignore, para que seja omitido ao subir no github.
// Exemplo: node_modules .env
//5. É necessário iniciar o .env no ponto mais externo da aplicação(o primeiro a ser acessado na pasta do projeto).
// No nosso caso, o ponto mais externo é o server.js, que está na pasta raiz "src".
// No início desse arquivo server.js, acima da linha de importação do app,importe o .env utilizando o comando abaixo.
// Exemplo: import "dotenv/config".

//apoós o mongodb.net, na string de conexão, adicionar livraria pra acessar a coleção livraria, criada na database.
//Pra exportar, vamos utilizar uma função
//Essa função Tem de ser assincrona, pois ela irá conectar ao banco de dados.

async function conectaNaDatabase(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
}

export default conectaNaDatabase;
 