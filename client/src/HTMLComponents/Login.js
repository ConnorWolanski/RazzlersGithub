import React from "react";
import '../style.css';
class Login extends React.Component {
  render() {
    return (
      <div className = "bg2" align = "left">
        <font size= "26" >Login</font>
          <input
            type="text"
            placeholder="Username"
            className="input"/>
          <input
            type="password"
            placeholder="Password"
            className="input"/>
            <button  className="button2">
              Login
            </button>
        </div>
    );
  }
}
export default Login
