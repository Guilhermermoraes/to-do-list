const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'db-mysql-nyc1-59137-do-user-13957166-0.b.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'AVNS_KtzSowZKfGT69GG27dg',
    database: 'defaultdb',
    port: 25060, // Porta do banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const task = req.body.task;
  const sql = 'INSERT INTO dados_gerais (task) VALUES (?)';
  db.query(sql, [task], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar a tarefa:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao adicionar a tarefa.' });
      return;
    }
    res.sendStatus(201);
  });
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM dados_gerais';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter as tarefas:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao obter as tarefas.' });
      return;
    }
    res.json(result);
  });
});

// Rota para excluir uma tarefa pelo ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM dados_gerais WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Erro ao deletar a tarefa:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao deletar a tarefa.' });
      return;
    }
    console.log(`Tarefa ${taskId} deletada com sucesso.`);
    res.sendStatus(200);
  });
});


app.listen(8000, () => {
  console.log('Servidor de API está rodando em http://localhost:8000');
});
