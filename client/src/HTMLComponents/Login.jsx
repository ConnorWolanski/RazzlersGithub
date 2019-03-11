import React from "react";
import '../style.css';
import { Modal, Button } from "react-bootstrap";
class Login extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        className = "signUpPage">
        <Modal.Header>
          <Modal.Title>
            <font size= "26">Log In</font>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="button2" onClick={this.props.onHide}>
            Login
          </Button>
          <Button variant="secondary" className="button2" onClick={this.props.onHide}>
            SignUp
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Login
