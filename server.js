const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/todo_app', { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  dueDate: String,
  checklist: [String],
  labels: [String]
});

const ListSchema = new mongoose.Schema({
  title: String,
  cards: [TaskSchema]
});

const List = mongoose.model('List', ListSchema);

app.get('/api/lists', async (req, res) => {
  const lists = await List.find();
  res.json(lists);
});

app.post('/api/lists', async (req, res) => {
  const newList = new List(req.body);
  await newList.save();
  res.json(newList);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
