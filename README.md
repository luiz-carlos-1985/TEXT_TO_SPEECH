TTS - Aplicativo onde o usuário pode adicionar um comentário na caixa de texto da coluna da esquerda que será enviado para um banco de dados MySQL e será exibido na coluna da direita em uma lista, sendo que cada comentário terá um botão OUVIR que transmite os dados da API Watson direto para o sistema, gerando uma URL local para que possa ser reproduzida, tudo em operações client side.

Configurando Localmente:
- Basta criar um arquivo .env no diretório raiz e preenche-lo com os seguintes dados:

DB_HOST =

DB_USER =

DB_PASS =

APIKEY =

APIURL =

Executando o Projeto:

- Instale as dependências npm: npm install

- Depois da instalação do npm, execute o aplicativo com: npm start

Será executado o front e o backend ao mesmo tempo!
