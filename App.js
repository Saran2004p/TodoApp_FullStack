import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [task, setTask] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [suggestion, setSuggestion] = useState('');

useEffect(() => {
  axios.get('http://localhost:3001/categories').then(res => setCategories(res.data));
  fetchTodos();
}, []);

const fetchTodos = () => {
  axios.get('http://localhost:3001/todos').then(res => setTodos(res.data));
};

const handleSubmit = () => {
  if (!task || !categoryId)
    return;

if (editingId) { 
  axios.put(`http://localhost:3001/todos/${editingId}`, { task, category_id: categoryId }).then(() => {
  
    fetchTodos();
    setTask('');
    setCategoryId('');
    setEditingId(null);
    setSuggestion('');
  });
} else {
  axios.post('http://localhost:3001/todos', { task, category_id: categoryId }).then(() => {
    fetchTodos();
    setTask('');
    setCategoryId('');
    setSuggestion('');
  });
}};

const handleEdit = (todo) => {
  setTask(todo.task);
  const cat = categories.find(cat => cat.name === todo.category);
  if (cat) { setCategoryId(cat.id);
    setSuggestion(cat.suggestion || '');
  } setEditingId(todo.id);
};

const handleDelete = (id) => {
  axios.delete(`http://localhost:3001/todos/${id}`).then(() => fetchTodos());
};

const handleCategoryChange = (e) => {
  const id = e.target.value;
  setCategoryId(id);
  const selectedCat = categories.find(cat => cat.id.toString() === id);
  setSuggestion(selectedCat?.suggestion || '');
};

return ( 
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input className='input-box' value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" required />
        <select value={categoryId} onChange={handleCategoryChange} required> 
          <option  value="">Select Category</option> {categories.map(cat => ( <option key={cat.id} value={cat.id}>{cat.name}</option> ))}
        </select>
        <button className='input-box' onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</button>
      </div> {suggestion && <p><strong>Suggestions:</strong> {suggestion}</p>}
      <ul>
        {todos.map(todo => ( 
          <li className='category-list' key={todo.id}>
            <span>{todo.task} ({todo.category})</span>
            <div className="button-group">
              <button className='btn edit' onClick={() => handleEdit(todo)}>Edit</button>
              <button className='btn delete' onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
