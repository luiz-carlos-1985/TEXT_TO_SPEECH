Aplicativo que usa node.js e React com Material UI. O usuário pode adicionar um comentário na caixa de texto da coluna da esquerda que será enviado para um banco de dados MySQL e será exibido na coluna direita em uma lista. Cada comentário terá um botão OUVIR que transmite os dados da API Watson direto para a janela e gera uma URL local para que possa ser reproduzida, tudo em operações do lado do cliente.

Configurando Localmente: Basta criar um arquivo .env no diretório raiz com os seguintes dados:

DB_HOST =

DB_USER =

DB_PASS =

APIKEY =

APIURL =

Executando o projeto: Instale as dependências npm:

npm install

Depois da instalação execute o aplicativo com:

npm start

Será executado o front e o backend ao mesmo tempo! Obrigado!
