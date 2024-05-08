import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodosAPI from "./services/TodoAPI";
import { newTodo, Todo } from "./types/Todo";
import "./assets/App.scss";

/**
 * The main App component.
 */
function App() {
  /**
   * State variable to store the list of todos, initialized as an empty array.
   */
  const [todos, setTodos] = useState<Todo[]>([]);

  // One of two use-cases for useRef - save a value between renders without triggering a re-render
  /*
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  console.log("I have rendered this many times:", renderCountRef.current);
  */

  /**
   * Function to add a new todo item.
   * @param todo The new todo item to be added.
   */
  const addTodo = async (todo: newTodo) => {
    // Create a new todo item using the TodosAPI
    // const newTodo = await TodosAPI.createTodo(todo);
    // setTodos([...todos, newTodo]);
    await TodosAPI.createTodo(todo);
    // Retrieve the updated list of todos
    getTodos();
  }

  /**
   * Function to retrieve the list of todos from the API.
   */
  const getTodos = async () => {
    // Reset the todos state
    setTodos([]);

    // Make a request to the API to get the list of todos
    const data = await TodosAPI.getTodos();

    // Update the todos state with the retrieved data
    setTodos(data);
  }

  /**
   * Function to delete a todo item.
   * @param todo The todo item to be deleted.
   */
  const handleDeleteTodo = async (todo: Todo) => {
    // Delete the todo item using the TodosAPI
    await TodosAPI.deleteTodo(todo.id);
    // Retrieve the updated list of todos
    getTodos();
  }

  /**
   * Function to toggle the completion status of a todo item.
   * @param todo The todo item to be toggled.
   */
  const handleToggleTodo = async (todo: Todo) => {
    // Update the todo item using the TodosAPI
    await TodosAPI.updateTodo(todo.id, {
      completed:!todo.completed,
    });
    // Retrieve the updated list of todos
    getTodos();
  }

  /**
   * Filtered list of finished todos.
   */
  const finishedTodos = todos.filter(todo => todo.completed);

  /**
   * Filtered list of unfinished todos.
   */
  const unfinishedTodos = todos.filter(todo =>!todo.completed);

  console.log("Component is rendering");

  /**
   * Use effect to retrieve the list of todos when the component mounts.
   */
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <h1>React Simple Todos</h1>

      <AddNewTodoForm
        onAddTodo={addTodo}
      />

      {todos.length > 0 && (
        <>
          <h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>

          <TodoList
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            todos={unfinishedTodos}
          />

          <h2 className="mb-2 h5">🥺 Stuff I've done</h2>

          <TodoList
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            todos={finishedTodos}
          />

          <TodoCounter finished={finishedTodos.length} total={todos.length} />
        </>
      )}

      {!todos.length && (
        <div className="alert alert-success">You ain't got no todos 🤩!</div>
      )}
    </div>
  );
}

export default App;


