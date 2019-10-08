import React, {Component} from 'react';
import axios from "axios";

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    changeName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Reg Description: ${this.state.name}`);
        console.log(`Reg Description: ${this.state.email}`);
        console.log(`Reg Create data: ${this.state.password}`);

        const newAuth = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:4000/auth/register', newAuth)
          .then((res) => {
              console.log('/register: POST data from register form to server', res.data);
              // window.location.replace("/");
              // res.redirect('/login');
          })
          .catch((err) => {
            console.error(err);
        });

        this.setState({
            name: '',
            email: '',
            password: '',
        })
    };

    render() {
        return (
          <>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label htmlFor="exampleInputUser">User name</label>
                      <input type="text"
                             className="form-control"
                             id="exampleInputUser"
                             aria-describedby="userHelp"
                             placeholder="Enter user name"
                             onChange={this.changeName}
                      />
                      <small id="userHelp"
                             className="form-text text-muted">
                          We'll never share your user with else.
                      </small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email"
                             className="form-control"
                             id="exampleInputEmail1"
                             aria-describedby="emailHelp"
                             placeholder="Enter email"
                             onChange={this.changeEmail}
                      />
                      <small id="emailHelp"
                             className="form-text text-muted">
                          We'll never share your email with else.
                      </small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input type="password"
                             className="form-control"
                             id="exampleInputPassword1"
                             placeholder="Password"
                             onChange={this.changePassword}
                      />
                  </div>
                  <div className="form-group">
                      <input type="submit"
                             value="Create Account"
                             className="btn btn-primary"/>
                  </div>
              </form>
          </>
        );
    }
}

export default Register;
