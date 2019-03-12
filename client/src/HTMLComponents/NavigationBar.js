import React from 'react';
import SignUp from "./SignUp";
import Login from "./Login.jsx";

class NavigationBar extends React.Component{
  constructor(...args) {
    super(...args);

    this.state =
    {
      modalShowSignUp: false,
      modalShowLogIn: false
    };
  }

  render(){
    let modalSignUpClose = () => this.setState({ modalShowSignUp: false });
    let modalLogInClose = () => this.setState({ modalShowLogIn: false });
    const{ params } = this.props;
    return(
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></link>
        </head>
        <body>
          <nav class="navbar navbar-default">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="Home"><img src="http://razzlers.me:8080/Razzlers_files/Razzlers-Logo.png" height= "100%"/></a>
              </div>
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li><a href="Shows">Shows</a></li>
                  <li><a href="Movies">Movies</a></li>
                  <li><a href="About">About</a></li>
                </ul>
                <form class="navbar-form navbar-left" role="search">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search"/>
                  </div>
                  <button type="submit" class="button2" >Search</button>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <button type = "button" class="button" onClick={() => this.setState({ modalShowSignUp: false, modalShowLogIn: true})}>LogIn</button>
                    <button type = "button" class="button" onClick={() => this.setState({ modalShowSignUp: true, modalShowLogIn: false})}>SignUp</button>
                </ul>
              </div>
            </div>
          </nav>
        </body>
        <Login
          show={this.state.modalShowLogIn}
          onHide={modalLogInClose}/>
        <SignUp
          show={this.state.modalShowSignUp}
          onHide={modalSignUpClose}/>
      </html>
  );
  }
}
export default NavigationBar;
