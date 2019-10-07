import React, {Component} from 'react';
import axios from 'axios';
import Todos from "./Todos";

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

    delete = (id) => {
        axios.delete('http://localhost:4000/todos/' + id)
          .then(() => {
              const newTodos = this.state.todos.filter(el => el._id !== id);
              this.setState(() => ({
                  todos: newTodos
              }));
          })
          .catch(err => console.log(err));
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
                  <Todos todos={this.state.todos}
                         onDelete={this.delete}

                  />
                  </tbody>
              </table>
          </div>
        )
    }
}
