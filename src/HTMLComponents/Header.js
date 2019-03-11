import React from "react";
import '../style.css';
import { Modal, Button } from "react-bootstrap";
import SignUp from "./SignUp";
import Member from "./Members";
import Login from "./Login.jsx";

class Header extends React.Component{
  constructor(...args) {
    super(...args);

    this.state =
    {
      modalShowSignUp: false,
      modalShowLogIn: false,
      modalShowMember: false
    };
  }

  render(){
    let modalSignUpClose = () => this.setState({ modalShowSignUp: false });
    let modalLogInClose = () => this.setState({ modalShowLogIn: false });
    let modalMemberClose = () => this.setState({ modalShowMember: false });
    return (
      <div>
        <header id = "bg2">
          <button
            className="logo_button"
            type="button">
              <img src="http://razzlers.me:8080/Razzlers_files/Razzlers-Logo.png" height = "80" padding = "10"/>
          </button>
          <button
            className="redirects"
            type="button">
            NetFlix
          </button>
          <button
            className="redirects"
            type="button">
            Hulu
          </button>
          <button
            className="redirects"
            type="button">
            Youtube
          </button>
          <button
            onClick={() => this.setState({ modalShowSignUp: false, modalShowLogIn: false, modalShowMember: true})}
            className="redirects"
            type="button">
            About
          </button>
          <button
            onClick={() => this.setState({ modalShowSignUp: false, modalShowLogIn: true, modalShowMember:false})}
            className="button"
            type="button">
              Log In
          </button>
          <button
            onClick={() => this.setState({ modalShowSignUp: true, modalShowLogIn: false, modalShowMember:false})}
            className="button"
            type="button">
              Sign Up
          </button>
        </header>
        <Login
          show={this.state.modalShowLogIn}
          onHide={modalLogInClose}/>
        <SignUp
          show={this.state.modalShowSignUp}
          onHide={modalSignUpClose}/>
        <Member
          show={this.state.modalShowMember}
          onHide={modalMemberClose}/>
      </div>
    )
  }
}
export default Header
