import { useState } from 'react'
import { Todo } from './types/Todo'
import "./assets/App.scss"


function App() {
	const [todos, setTodo] = useState<Todo[]>([
		{ id: 1, title: "Make coffee", completed: true },
		{ id: 2, title: "Drink coffee", completed: false },
		{ id: 3, title: "Drink MOAR coffee", completed: false },
		{ id: 4, title: "Drink ALL ZE coffee", completed: false },
	]);
	const [inputValue, setInputValue] = useState("");

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		setTodo([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputValue,
			completed: false,
		}]);

		setInputValue("");
	};

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed;
		setTodo([...todos]); // force re-render

	}

	const numberComplete = todos.filter(todos => todos).length;
	const numberTotal = todos.length

	return (
		<>

			<h1>{numberComplete} av {numberTotal} completed </h1>
			<h1>Simple todos!</h1>

			<form onSubmit={handleAddTodo} className="mb-3">
				<div className="input-group">

					<input type="text" className="form-control" placeholder="Fun with Forms"
						required aria-label="Post Title" onChange={e => setInputValue(e.target.value)} value={inputValue} />

					<button type="submit" className="btn btn-success">
						Create
					</button>

					<button className="btn btn-success" type="submit">👶🏻</button>
				</div>
			</form>

			<ul className="todolist list-group">
				{todos.map(todo => (
					<li key={todo.id} className={todo.completed ? "done list-group-item" : "list-group-item"}>
						<span className="todo-title">{todo.title}</span>

						<div>
							<button
								className="btn btn-sm btn-warning"
								onClick={() => handleToggleTodo(todo)}
							>{todo.completed ? "✅" : "☑️"}</button>
						</div>
					</li>
				))}
			</ul>

		</>
	)
}

export default App
