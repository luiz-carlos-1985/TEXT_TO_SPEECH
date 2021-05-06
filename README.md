TTS - Aplicativo onde o usuário pode adicionar um comentário na caixa de texto da coluna da esquerda que será enviado para um banco de dados MySQL e será exibido na coluna da direita em uma lista, sendo que cada comentário terá um botão OUVIR que transmite os dados da API Watson direto para o sistema, gerando uma URL local para que possa ser reproduzida, tudo em operações client side.

* Instruções:

- Abra o projeto com o Visual Studio Code clicando em File e depois em Open Folder.
- Instale as dependências do projeto executando no terminal:
  
  - npm install
  - npm install mysql2
  - npm install sequelize
  - npm install nodemon -D
  - npm install sequelize-cli		
  - npm install express
  - npm install ibm-watson
  - npm install watson-developer-cloud 

* Criação das tabelas no banco MySql:

  - npx sequelize-cli init
  - npx sequelize migration:create --name=comments
  - npx sequelize db:migrate

* Configurando Localmente:

- Criar um arquivo .env no diretório raiz e preenche-lo com os seguintes dados:

DB_HOST = localhost

DB_USER = 'root' (usuário do BD)

DB_PASS = 'suasenha'

APIKEY = 'chave da api do IBM Watson'

APIURL = 'url da api'


* Executando o Projeto:


- Execute o aplicativo com o comando: npm start

