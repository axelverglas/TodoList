import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between p-4 my-2 bg-slate-200 rounded`,
  liComplete: `flex justify-between p-4 my-2 bg-slate-400 rounded`,
  row: `flex items-center`,
  text: `ml-4 text-gray-700 cursor-pointer`,
  textComplete: "ml-4 line-through cursor-pointer",
  button: "cursor-pointer flex items-center",
};

export default function Todo({ todo, toggleChecked, deleteTodo }) {
  return (
    <li className={todo.isChecked ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleChecked(todo)}
          type="checkbox"
          checked={todo.isChecked ? "checked" : ""}
        />
        <p
          onClick={() => toggleChecked(todo)}
          className={todo.isChecked ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
}
