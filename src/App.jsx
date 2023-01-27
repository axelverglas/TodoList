import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-400 to-purple-500`,
  container: `max-w-md m-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl p-4`,
  heading: `text-black text-3xl font-semibold p-4 text-center`,
  form: `flex items-center`,
  input: `flex-1 appearance-none rounded border border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
  button: `ml-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`,
  count: `text-center p-4`,
  error: `flex w-full rounded bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 mt-4`,
};

const App = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [error, setError] = useState(false);

  const addTodo = (e) => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todo,
      isChecked: false,
    };

    if (todo === "") {
      setError(true);
      return;
    }

    if (todo !== "") {
      setAllTodos([...allTodos].concat(todoItem).reverse());
      setTodo("");
    }

    console.log(allTodos);
  };

  const getAllTodos = () => {
    let stored = JSON.parse(localStorage.getItem("todo"));

    if (stored) {
      setAllTodos(stored);
    }
  };

  const toggleChecked = (todo) => {
    const updatedTodo = allTodos.map((item) => {
      if (item.id === todo.id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setAllTodos(updatedTodo);
  };

  const deleteTodo = (id) => {
    const filteredTodo = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(filteredTodo);
  };

  const todosRemaining = allTodos.filter((todo) => !todo.isChecked).length;

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Liste des tâches</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value) & setError(false)}
            className={style.input}
            type="text"
            placeholder="Ajouter une tâche"
          />
          <button className={style.button} type="submit">
            <AiOutlinePlus />
          </button>
        </form>
        {error && <div className={style.error}>Veuillez entrer une tâche</div>}
        <ul>
          {allTodos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleChecked={toggleChecked}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todosRemaining < 1 ? null : (
          <p className={style.count}>
            {todosRemaining}{" "}
            {todosRemaining > 1 ? "tâches restantes" : "tâche restante"}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
