import mongoose from "mongoose";    //biblioteca para interagir com o MongoDB de forma assíncrona usando o Node.js.

//Criando uma Base de Dados no MongoDB
//1. Tenha uma conta no MongoDB
//2. Crie um projeto 
//3. Clique em Create Deployment
//4. Selecione o Template Cluster de configuração M0 é a camada gratuita do MongoDB Atlas, frequentemente usada para aprendizado, desenvolvimento e testes.
//5. Defina o Nome do Template Cluster e clique em Create.     //Um cluster no MongoDB é usado para fornecer escalabilidade, alta disponibilidade e tolerância a falhas. Ele consiste em vários servidores que desempenham papéis específicos dentro do ambiente.
//6. Na próxima pagina, defina o nome de user e senha e crie o usuario. //abnermcunha11 e u4xYygXnxvpwZfqB
//7. Ainda nesta pagina, na seção "Add entries to your IP Access List"(Lista de acesso de IPs), adicione o seu Endereço de IP Atual 
//8. Criado o IP e User, finalize o processo. Agora ele abrirá o overview do Cluster criado.
//9. Clique em Connectar e então em Drivers e Selecione o driver Node.js, e a versão estavel sugerida.
//10. Instale no terminal do projeto o "npm install mongodb"
//11. Copie a string de conexao com o banco "mongodb+srv://abnermcunha11:<password>@clusteroutro.0rjfjjj.mongodb.net/?retryWrites=true&w=majority"
//12. Substitua <senha> pela senha do usuário abnermcunha11. 
//13.1 poderia definir a string de conexão diretamente em mongoose.connect na função asincrona conectaNaDatabase, porém isso deixaria a applicação insegura com relação ao BD. exemplo: mongoose.connect("mongodb+srv://abnermcunha11:senha123@clusteroutro.0rjfjjj.mongodb.net/?retryWrites=true&w=majority");

//13.2 Por isso, é possivel censurar partes do código ao subir p/ o github, com VARIAVEIS DE AMBIENTE: 
// VARIAVEIS DE AMBIENTE: são utilizadas para esconder dados sensiveis da aplicação, como senhas de conexão de banco de dados da empresa. Para isso siga:
//13.2.1. Instalar o .env que é onde se declara VARIAVEIS DE AMBIENTE. no terminal deve ser executado:
// Exemplo: npm instal dotenv
//13.2.2. Criar arquivo .env , na raiz do projeto, no mesmo, nível do .gitignore.
//13.2.3. declarar o nome da variavél, recomendado é em CAPS LOCK, seguido de "="(igual), concatenando com a variavel de ambiente, sem aspas:
// Exemplo: DB_CONNECTION_STRING=mongodb+srv://admin:MINHASENHA@cluster0.em8fsdi.mongodb.net/livraria?retryWrites=true&w=majority
//13.2.4. No arquivo de conexão(dbConnect.js), defina no metodo connect do mongoose, dentro do parenteses, a variavel de ambiente.
//Exemplo: mongoose.connect(process.env.DB_CONNECTION_STRING);
//13.2.5. Adicionar o arquivo .env no .gitignore, para que seja omitido ao subir no github.
// Exemplo: node_modules .env
//13.2.6. É necessário iniciar o .env no ponto mais externo da aplicação(o primeiro a ser acessado na pasta do projeto).
//13.2.7 No nosso caso, o ponto mais externo é o server.js, que está na pasta raiz "src".
// No início desse arquivo server.js, acima da linha de importação do app,importe o .env utilizando o comando abaixo.
// Exemplo: import "dotenv/config".
//14. Se estiver utilizando o eslint, altere a configuração para poder utilizar as variaveis de ambiente sem aparecer erros. :
//  alterar de { "browser" : true, } para node recebendo true ao configurar as variaveis de ambiente, em .eslintrc.json


//A palavra-chave async indica que a função retornará uma Promise e pode conter operações assíncronas.
async function conectaNaDatabase(){
  mongoose.connect(process.env.DB_CONNECTION_STRING);     //process.env : é um objeto que contém informações sobre o ambiente do sistema e é uma maneira de acessar variáveis de ambiente no Node.js. 
  return mongoose.connection;
}

export default conectaNaDatabase;
 