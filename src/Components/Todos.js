import React from "react";
import Todo from "./Todo";


const Todos = ({todos, onDelete}) => {
    return (
      <>
          {todos.map(todo => (
            <Todo todo={todo}
                  key={todo._id}
                  deleteTodo={onDelete}
            />
          ))}
      </>
    )
};
export default Todos;