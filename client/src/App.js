import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BackgroundImage from './images/back2.png';
import './style.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login.js';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import NavigationBar from "./HTMLComponents/NavigationBar";
import SignUp from "./pages/SignUp.js";
import PlayVideo from "./pages/PlayVideo.js";
import Profile from "./pages/Profile.js";
import Subscriptions from "./pages/Subscriptions.js";

class App  extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      backgroundImage: BackgroundImage
    }
    const dotenv = require('dotenv');
    dotenv.config();
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
            <Route path = "/playvideo" component = {PlayVideo} />
            <Route path = "/Subscriptions" component = {Subscriptions} />
            <Route path = "/profile" component = {Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
