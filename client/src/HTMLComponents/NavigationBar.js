import React from 'react';
import SignUp from "./SignUp.js";
import Login from "./Login.js";

class NavigationBar extends React.Component{
  render()
  {
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
                <a class="navbar-brand" href="/"><img src="http://razzlers.me:8080/Razzlers_files/Razzlers-Logo.png" height= "100%"/></a>
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
                    <button type = "button" class="button" onClick={() => window.location.href='login'}>LogIn</button>
                    <button type = "button" class="button" onClick={() => window.location.href='signup'}>SignUp</button>
                </ul>
              </div>
            </div>
          </nav>
        </body>
      </html>
    );
  }
}
// onClick={() => checkStorage()}
export default NavigationBar;
