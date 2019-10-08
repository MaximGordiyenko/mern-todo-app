import React, {Component} from 'react';
import axios from "axios";

class Login extends Component {
    state = {
        email: '',
        password: '',
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
        console.log(`Todo Description: ${this.state.email}`);
        console.log(`Todo Create data: ${this.state.password}`);

        const newAuth = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:4000/login', newAuth)
          .then((res) => {
              console.log(res.data)
          }).catch((err)=>{
            console.log(err);
        });

        this.setState({
            email: '',
            password: '',
        })
    };

    render() {
        return (
          <>
              <form onSubmit={this.onSubmit}>
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
                             value="Log-in"
                             className="btn btn-primary"/>
                  </div>
          </form>
          </>
        );
    }
}

export default Login;
