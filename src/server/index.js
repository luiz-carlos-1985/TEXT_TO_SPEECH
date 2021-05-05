//dependencias
const express = require("express"),
      cors = require("cors"),
      mysql = require("mysql"),
      TextToSpeechV1 = require("ibm-watson/text-to-speech/v1"),
      { IamAuthenticator } = require("ibm-watson/auth");

//iniciar app
const app = express();
app.use(cors());
require('dotenv').config();


//conectar ao banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
});

//configuração do banco de dados, cria o squema se não existir
connection.query("CREATE DATABASE IF NOT EXISTS commentsdb", (err) => {
  if (err) throw err;
  connection.query("USE commentsdb", (err) => {
    if (err) throw err;
    connection.query(
      "CREATE TABLE IF NOT EXISTS comments(" +
        "id INT NOT NULL AUTO_INCREMENT," +
        "PRIMARY KEY(id)," +
        "text VARCHAR(255)" +
        ")",
      (err) => {
        if (err) throw err;
      }
    );
  });
});

//  Configuração do Watson TTS
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  url:
    process.env.APIURL,
});

//rota para adicionar comentários
app.post("/comments/add", (req, res) => {
  const { text } = req.query;
  const INSERT_COMMENT_QUERY = `INSERT INTO comments (text) VALUES("${text}")`;
  connection.query(INSERT_COMMENT_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.redirect("/comments");
    }
  });
});

//rota para listar comentários
app.get("/comments", (req, res) => {
  const SELECT_ALL_COMMENTS_QUERY = "SELECT * FROM comments";
  connection.query(SELECT_ALL_COMMENTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

//rota para o Watson com a voz em português
app.get("/synthesize", async (req, res, next) => {
  const { text } = req.query;
  const params = {
    text: text,
    accept: "audio/webm",
    voice: "pt-BR_IsabelaVoice",
  };
  try {
    const { result } = await textToSpeech.synthesize(params).catch((err) => {
      console.log("error:", err);
    });
    const transcript = result;
    transcript.pipe(res);
  } catch (error) {
    res.send(error);
  }
});

//iniciar servidor
app.listen(4000, () => {
  console.log("SERVIDOR SENDO EXECUTADO COM SUCESSO NA PORTA 4000");
});
