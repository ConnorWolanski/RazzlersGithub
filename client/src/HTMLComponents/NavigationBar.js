import React from 'react';

class NavigationBar extends React.Component
{
  render()
  {
    //const{ params } = this.props;
    return(
      <div>
        <header>
<<<<<<< HEAD
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous"></link>
=======
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous"></link>
>>>>>>> c2a38726134a951299d9c83f84a1926b5f0c52cc
        </header>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
<<<<<<< HEAD
                <a className="navbar-brand" href="/"><img src="http://razzlers.me:8080/Razzlers_files/Razzlers-Logo.png" height= "100%"/></a>
=======
                <a className="navbar-brand" href="/"><img src="http://razzlers.me:8080/Razzlers_files/Razzlers-Logo.png" height= "100%" alt="logo"/></a>
>>>>>>> c2a38726134a951299d9c83f84a1926b5f0c52cc
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><a href="Shows">Shows</a></li>
                  <li><a href="Movies">Movies</a></li>
                  <li><a href="About">About</a></li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button type="submit" className="button2" >Search</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
<<<<<<< HEAD
                    <button type = "button" className="button" onClick={() => window.location.href='login'}>LogIn</button>
                    <button type = "button" className="button" onClick={() => window.location.href='signup'}>SignUp</button>
=======
                  <button type = "button" className="button" onClick={() => window.location.href='login'}>LogIn</button>
                  <button type = "button" className="button" onClick={() => window.location.href='signup'}>SignUp</button>
>>>>>>> c2a38726134a951299d9c83f84a1926b5f0c52cc
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

// onClick={() => checkStorage()}
export default NavigationBar;
