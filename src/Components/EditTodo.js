import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    state = {
        text: '',
        user_id: '',
        completed: false,
        create_data: '',
    };

    componentDidMount = () => {
        axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
          .then(response => {
              this.setState({
                  text: response.data.text,
                  user_id: response.data.user_id,
                  completed: response.data.completed,
                  create_data: response.data.create_data
              })
          })
          .catch((error) => {
              console.log(error);
          })
    };

    changeText = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    changeDate = () => {
        this.setState({
            create_data: new Date().toDateString()
        });
    };

    changeCompleted = (e) => {
        this.setState({
            completed: !this.state.completed
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            text: this.state.text,
            // user_id: this.state.user_id,
            completed: this.state.completed,
            create_data: this.state.create_data
        };
        console.log(obj);
        axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}, ${obj}`)
          .then(res => console.log(res.data));

        this.props.history.push('/');
    };


    render() {
        return (
          <div>
              <h3 align="center">Update Todo</h3>
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
                      <label>Date: </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.create_data}
                        onChange={this.changeDate}
                      />
                  </div>
                  <div className="form-check">
                      <input className="form-check-input"
                             id="completedCheckbox"
                             type="checkbox"
                             name="completedCheckbox"
                             onChange={this.changeCompleted}
                             checked={this.state.completed}
                             value={this.state.completed}
                      />
                      <label className="form-check-label"
                             htmlFor="completedCheckbox">
                          Completed
                      </label>
                  </div>

                  <br/>

                  <div className="form-group">
                      <input type="submit"
                             value="Update Todo"
                             className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
    }
}
