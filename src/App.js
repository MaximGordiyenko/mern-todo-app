import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CreateTodo from "../src/Components/CreateTodo";
import EditTodo from "../src/Components/EditTodo";
import TodosList from "../src/Components/TodosList";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./Components/Register";

class App extends Component {

    render() {
        return (
          <Router>
              <div className="container">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="collpase navbar-collapse">
                          <ul className="navbar-nav mr-auto">
                              <li className="navbar-item">
                                  <Link to="/" className="nav-link">Todos</Link>
                              </li>
                              <li className="navbar-item">
                                  <Link to="/add" className="nav-link">Create Todo</Link>
                              </li>
                          </ul>
                      </div>
                  </nav>
                  <br/>
                  <Route path="/auth" exact component={Register} />
                  <Route path="/" exact component={TodosList} />
                  <Route path="/edit/:id" component={EditTodo} />
                  <Route path="/add" component={CreateTodo} />
              </div>
          </Router>

        );
    }
}

export default App;
