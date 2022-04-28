import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const todoItems = [];
todoItems.push({ id: 1, value: 'learn react', done: false });
todoItems.push({ id: 2, value: 'Go shopping', done: true });
todoItems.push({ id: 3, value: 'buy flowers', done: true });
let lastId = todoItems.length;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/task', (req, res) => {
	return res.json({ data: todoItems, status: 'Success in getting all tasks' });
});

app.post('/task', (req, res) => {
	lastId = todoItems.push({
		id: lastId + 1,
		value: req.body.value,
		done: false,
	});
	return res.json({ data: todoItems, status: 'Success in creating a task' });
});

app.delete('/task/:id', (req, res) => {
	const todoItems = todoItems.filter(item => item.id !== +req.params.id);
	return res.json({ data: todoItems, status: 'Success in deleting the task' });
});

app.patch('/task/:id', (req, res) => {
	const task = todoItems.find(item => item.id === +req.params.id);
	task.done = req.body.done;
	return res.json({ data: todoItems, status: 'Success in updating the task' });
});

app.listen(8000, () => {
	console.log('Example app running!');
	console.log();
	console.log('Running on:');
	console.log();
	console.log('	- Local:	"localhost:8000".');
});
