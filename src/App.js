import React, { Component } from 'react';
import './App.css';
import * as sdk from 'gooddata';

console.log('sdk', sdk);

class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: null,
      message: 'user has not logged in yet'
    }
  }

  onSubmit(event){
    event.preventDefault();
    const form = this.form;
    const data = Array.from(form.elements).reduce( (dataHash, element) => (element.name ? {
      ...dataHash,
      [element.name]: element.value
    }: dataHash), {} );
    console.dir(form);
    console.log('data', data);
    const { username, password } = data;

    this.setState({
      isLoggedIn: null,
      message: 'user is trying to log in'
    });

    sdk.user.login(username, password).then(
      () => this.setState({ isLoggedIn: true, message: 'user is logged in :-)' }),
      (error) => this.setState({ isLoggedIn: false, message: 'error while trying to log in: ' + error })
    );
  }

  logout() {
    this.setState({
      message: 'logging out'
    });
    sdk.user.logout().then(
      () => this.setState({ isLoggedIn: false, message: 'user has logged out' }),
      (error) => this.setState({ isLoggedIn: false, message: 'error while trying to log out: ' + error })
    );
  }

  render() {
    const { isLoggedIn, message } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.onSubmit} ref={ form => this.form = form }>
          <div><label>username <input type="text" name="username" /></label></div>
          <div><label>password <input type="password" name="password" /></label></div>
          <div><button type="submit" >Login</button></div>
        </form>

        <p>isLoggedIn: {isLoggedIn + ''}</p>
        { message ? <p>{message}</p> : null }
        { isLoggedIn ? <p><button onClick={this.logout} >Logout</button></p> : null }
      </div>
    );
  }
}

export default App;
