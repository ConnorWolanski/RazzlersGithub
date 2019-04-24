import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BackgroundImage from './images/back2.png';
import './style.css';
import NavigationBar from "./HTMLComponents/NavigationBar.js";
import Footer from "./HTMLComponents/Footer.js";
import Home from './pages/Home.js';
import About from './pages/About.js';
import Login from './pages/Login.js';
import Movies from './pages/Movies.js';
import Shows from './pages/Shows.js';
import SignUp from "./pages/SignUp.js";
import PlayVideo from "./pages/PlayVideo.js";
import Profile from "./pages/Profile.js";
import Subscriptions from "./pages/Subscriptions.js";
import Search from "./pages/Search.js";
import Billing from "./pages/Billing.js";
import EditBilling from "./pages/EditBilling.js";
import VideoInformation from "./pages/VideoInformation.js";
import MovieInformation from "./pages/MovieInformation.js";
import EpisodeInformation from "./pages/EpisodeInformation.js";
import Episodes from './pages/Episodes.js';

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
            <Route path = "/Search" component = {Search} />
            <Route path = "/profile" component = {Profile} />
	    <Route path = "/billing" component = {Billing} />
	    <Route path = "/editBilling" component = {EditBilling} />
	    <Route path = "/videoInformation" component = {VideoInformation} />
	    <Route path = "/movieInformation" component = {MovieInformation} />
	    <Route path = "/episodeInformation" component = {EpisodeInformation} />
	    <Route path = "/episodes" component = {Episodes} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
