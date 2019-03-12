import React from "react";
import '../style.css';
class Login extends React.Component {
  render() {
    return (
        <div>
          <font size= "26">Log In</font>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="input"/>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="input"/>
        </div>
        </div>
    );
  }
}
export default Login
