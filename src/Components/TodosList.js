import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import completed from '../index.css';

const Todo = props => (
  <tr>
      <td className={props.todo.completed ? 'completed' : ''}>{props.todo.text}</td>
      <td className={props.todo.completed ? 'completed' : ''}>{props.todo.create_data}</td>
      <td>
          <Link to={"/edit/"+props.todo._id}>Edit</Link>
      </td>
  </tr>
);

export default class TodosList extends Component {
    state = {
        todos: []
    };

    componentDidMount = () => {
        axios.get('http://localhost:4000/todos/')
          .then(response => {
              this.setState({
                  todos: response.data
              });
          })
          .catch((error) => {
              console.log(error);
          });
    };

    todoList = () => {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i}/>;
        })
    };

    render() {
        return (
          <div>
              <h3>Todos List</h3>
              <table className="table table-striped" style={{marginTop: 20}}>
                  <thead>
                  <tr>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.todoList()}
                  </tbody>
              </table>
          </div>
        )
    }
}
