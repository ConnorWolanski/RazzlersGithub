import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BackgroundImage from './back2.png';
import './style.css';
import Home from './HTMLComponents/Home';
import About from './HTMLComponents/About';
import Login from './HTMLComponents/Login.js';
import Movies from './HTMLComponents/Movies';
import Shows from './HTMLComponents/Shows';
import NavigationBar from "./HTMLComponents/NavigationBar";
import SignUp from "./HTMLComponents/SignUp.js";

class App  extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      backgroundImage: BackgroundImage
    }
  }

  // This method is called when react first initializes, ensures react is mounted
  componentDidMount()
  {
    document.title ="Razzlers";
    this.fetchData();
    var hasLocalStorage = this.checkLocalStorage();
    if(hasLocalStorage === true)
    {
      console.log("This browser has HTML5 Local Storage!");
    } else {
      console.log("This browser does not support Local Storage...");
    }
  }

  // check if client browser has HTML5 localStorage enabled
  checkLocalStorage()
  {
    try{
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  // fetches data on mount for states
  fetchData()
  {

  }

  // This is what is drawn on the browser
  render()
  {
    //const{backgroundImage, logo, database} = this.state;
    return (
      <Router>
        <div>
          <img src = {this.state.backgroundImage} id = "bg" alt = "razzlers logo"/>
          <NavigationBar params={this.props.params} />
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path = "/movies" component = {Movies} />
            <Route path= "/shows" component = {Shows} />
            <Route path = "/about" component = {About} />
            <Route path = "/login" component = {Login} />
            <Route path = "/signup" component = {SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
