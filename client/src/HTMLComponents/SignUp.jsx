import React from "react";
import '../style.css';
import { Modal, Button } from "react-bootstrap";
class SignUp extends React.Component {

  render() {
    return (
      <Modal
        {...this.props}
        className = "signUpPage"
      >
      <Modal.Header>
        <Modal.Title>
          <font size= "26">Sign Up</font>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            type="text"
            placeholder="Email"
            className="input"/>
        </div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="input"/>
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            className="input"/>
        </div>
        <div>
          <input
            type="text"
            placeholder="Display Name"
            className="input"/>
        </div>
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
        <Button variant="secondary" className="button2" onClick={this.props.onHide}>
          SignUp
        </Button>
        <Button variant="primary" className="button2" onClick={this.props.onHide}>
          Login
        </Button>
      </Modal.Footer>
      </Modal>
    );
  }
}
export default SignUp
