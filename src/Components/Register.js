import React, {Component} from 'react';

class Register extends Component {
    render() {
        return (
          <>
              <form>
                  <div className="form-group">
                      <label htmlFor="exampleInputUser">User name</label>
                      <input type="text"
                             className="form-control"
                             id="exampleInputUser"
                             aria-describedby="userHelp"
                             placeholder="Enter email"/>
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
                             placeholder="Enter email"/>
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
                             placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                      <input type="checkbox"
                             className="form-check-input"
                             id="exampleCheck1"/>
                      <label className="form-check-label"
                             htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit"
                          className="btn btn-primary">Submit</button>
              </form>
          </>
        );
    }
}

export default Register;
