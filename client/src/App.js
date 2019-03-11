import React from "react";
import BackgroundImage from './back2.png';
import './style.css';
//import templates from other places
import Header from "./HTMLComponents/Header";
import SignUp from "./HTMLComponents/SignUp";
//import MainContent from "./HTMLComponents/MainContent";
//import Footer from "./HTMLComponents/Footer";

class App  extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      backgroundImage: BackgroundImage,
      database: []
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
    const{backgroundImage, logo, database} = this.state;
    return (
      <div>
          <img src = {this.state.backgroundImage} id = "bg"/>
          <Header />
          
      </div>
    );
  }
}
export default App;
