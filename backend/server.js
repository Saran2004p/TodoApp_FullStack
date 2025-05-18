const cors = require('cors');
const express = require('express');
const mysql = require('mysql2'); 
const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'saran04',
    database: 'todo_list'
});

app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) 
            return res.status(500).json(err);
        res.json(results); 
    });
});

app.get('/todos', (req, res) => {
    db.query('SELECT todos.id, todos.task, categories.name as category FROM todos JOIN categories ON todos.category_id = categories.id', (err, results) => {
        if (err) 
            return res.status(500).json(err);
        res.json(results); 
    });
});

app.post('/todos', (req, res) => {
    const { task, category_id } = req.body;
    db.query('INSERT INTO todos (task, category_id) VALUES (?, ?)', [task, category_id], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.json({ id: result.insertId, task, category_id });
    });
});

app.put('/todos/:id', (req, res) => {
    const { task, category_id } = req.body;
    const { id } = req.params;
    db.query('UPDATE todos SET task = ?, category_id = ? WHERE id = ?', [task, category_id, id], (err) => {
        if (err)
            return res.status(500).json(err);
        res.json({ id, task, category_id });
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err)
            return res.status(500).json(err);
        res.json({ success: true });
    });
});

app.put('/todos/:id/complete', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE todos SET completed = 1 WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});


app.listen(3001, () => console.log('Server running on port 3001'));






