const express = require('express');
const app = express();
const PORT = 3002;
const users = [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' } ];
app.get('/products', (req, res) => res.json(users));
app.listen(PORT, () => console.log('Service A running on :${PORT}'));
