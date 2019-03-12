import React from "react";
import '../style.css';
class SignUp extends React.Component {

  render() {
    return (
      <div className = "bg2" align = "left">
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
            <div className="tos">
              <font> </font>
              <input type="checkbox" name="terms"></input>
                <font> I Agree Terms & Coditions</font>
                <br></br>
<<<<<<< HEAD
              </div>
=======
            </div>
>>>>>>> c2a38726134a951299d9c83f84a1926b5f0c52cc
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
