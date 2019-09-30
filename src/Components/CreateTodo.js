import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    state = {
        text: '',
        user_id: '',
        completed: false,
        create_data: '',
    };

    changeText = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    changeDate = () => {
        this.setState({
            create_data: new Date()
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.text}`);
        console.log(`Todo ID: ${this.state.user_id}`);
        console.log(`Todo Create data: ${this.state.create_data}`);

        const newTodo = {
            text: this.state.text,
            user_id: this.state.user_id,
            completed: this.state.completed,
            create_data: this.state.create_data
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
          .then(res => console.log(res.data));

        this.setState({
            text: '',
            user_id: '',
            create_data: '',
            completed: false,
        })
    };

    render() {
        return (
          <div style={{marginTop: 10}}>
              <h3>Create New Todo</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Description: </label>
                      <input type="text"
                             className="form-control"
                             value={this.state.text}
                             onChange={this.changeText}
                      />
                  </div>
                  <div className="form-group">
                      <label>Data: </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.create_data}
                        onChange={this.changeDate}
                      />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Create Todo" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
    }
}