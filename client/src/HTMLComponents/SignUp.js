import React from "react";
import '../style.css';
class SignUp extends React.Component {

  render() {
    return (
      <div className = "bg2" align = "center">
        <font size= "26" >Sign Up</font>
          <input
            type="text"
            placeholder="Email"
            className="input"/>

            <input
              type="text"
              placeholder="First Name"
              className="input"/>


            <input
              type="text"
              placeholder="Last Name"
              className="input"/>

            <input
              type="text"
              placeholder="Display Name"
              className="input"/>

            <input
              type="text"
              placeholder="Username"
              className="input"/>

            <input
              type="password"
              placeholder="Password"
              className="input"/>
            <button  className="button2">
              SignUp
            </button>
            <button  className="button2">
              Login
            </button>
        </div>
    );
  }
}
export default SignUp
