import React from 'react';
import {Link} from "react-router-dom";
import completed from '../index.css';

export const Todo = ({todo, deleteTodo}) => (
  <>
      <tr>
          <td className={todo.completed ? 'completed' : ''}>
              {todo.text}</td>
          <td className={todo.completed ? 'completed' : ''}>
              {todo.create_data}</td>
          <td>
              <Link to={"/edit/" + todo._id}>Edit</Link>
          </td>
          <td>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="btn btn-danger">
                  Delete
              </button>
          </td>
      </tr>
  </>
);

export default Todo;