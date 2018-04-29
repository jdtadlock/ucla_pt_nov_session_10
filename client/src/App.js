import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      is_register: false,
      user: {},
      logged_in: false
    }
  }

  componentDidMount = () => {
    axios.get('/auth/isauth')
      .then((res) => {
        console.log(res.data);
        this.setState({user: res.data, logged_in: true})
      })
  }
  

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  loginOrRegister = (is_register) => {
    let url = is_register ? '/auth/register' : '/auth/login';

    axios.post(url, {email: this.state.email, password: this.state.password})
      .then(res => {
        this.setState({user: res.data, logged_in: true});
      });
  }

  toggleAuth = () => {
    this.setState({
      is_register: !this.state.is_register
    });
  }

  render() {
    return (
      <div>
        <h1>Note App</h1>

        <Route path="/" exact render={props => (
          this.state.logged_in ? <Redirect to="/dashboard" /> :
            <form>
              <h2>{this.state.is_register ? 'Register' : 'Sign In'}</h2>
              <input type="text"
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange} />
              <input type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange} />
              <button onClick={(e) => {
                e.preventDefault();
                this.loginOrRegister(this.state.is_register);
              }}>Submit</button>

              <div className="auth-toggle">
                <span>Login</span>
                <div className="toggle-bar" onClick={this.toggleAuth}>
                  <span className={`toggle-switch ${this.state.is_register ? 'toggle' : ''}`}></span>
                </div>
                <span>Register</span>
              </div>
            </form>
        )} />

        <Route path="/dashboard" render={props => (
          !this.state.logged_in ? <Redirect to="/" /> : <Dashboard user={this.state.user} />
        )} />
      </div>
    );
  }
}

export default App;
