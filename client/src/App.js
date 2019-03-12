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

class App  extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      backgroundImage: BackgroundImage
    }
  }

  componentDidMount(){
    document.title ="Razzlers";
    this.fetchData();
  }

  fetchData(){
    const url = "http://localhost:3001/api/getData";
    fetch(url, {method: 'GET'})
    .then(response => {
      if(response.ok)
      {
        response.json().then(json => {
          // console.log(json[0].username + ": " + json[0].first_name + " " + json[0].last_name);
          console.log(json);
        })
      }
    })
    .then()
  }
  render(){
    return (
      <Router>
        <div>
          <img src = {this.state.backgroundImage} id = "bg" />
          <NavigationBar/>
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
