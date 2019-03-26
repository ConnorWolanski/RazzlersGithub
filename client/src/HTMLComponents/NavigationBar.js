import React from 'react';
class NavigationBar extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      logedin: false
    }
  }
  render()
  {
    var isHidden = window.localStorage.getItem("Razzlers_Username");
    if(isHidden === null)
    {
      isHidden = false;
    } else {
      isHidden = true;
    }
    return(
      <div>
        <header>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous"></link>
        </header>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/"><img src={require('../images/Razzlers-Logo.png')} height= "100%" alt="logo"/></a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><a href="Shows"><b>Shows</b></a></li>
                  <li><a href="Movies"><b>Movies</b></a></li>
                  <li id ="Subscriptions" className={!isHidden ? 'hide' : 'none'}><a href="Subscriptions" ><b>Subscriptions</b></a></li>
                  <li><a href="About"><b>About</b></a></li>
                  <li><a href="contactus"><b>Contact Us</b></a></li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button type="submit" className="button3" >Search</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <button hidden = {isHidden} type = "button" className="button" onClick={() => window.location.href='login'}>LogIn</button>
                  <button hidden = {isHidden} type = "button" className="button" onClick={() => window.location.href='signup'}>SignUp</button>
                  <button hidden = {!isHidden} type = "button" className="button" onClick={() => window.location.href='profile'}>Profile</button>
                  <button hidden = {!isHidden} type = "button" className="button" onClick={() => {
                      window.localStorage.removeItem("Razzlers_Username");
                      window.localStorage.removeItem("Razzlers_Subscribed_Shows");
                      window.localStorage.removeItem("Razzlers_Subscribed_Moives");
                      window.location.href='/';
                    }}>Logout</button>
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
