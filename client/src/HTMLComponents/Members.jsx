import React from "react";
import '../style.css';
import { Modal, Button } from "react-bootstrap";
class Members extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        className = "signUpPage">
        <Modal.Header>
          <Modal.Title>
            <font size= "26"><u><b>Team Members:</b></u><br/></font>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              <br/><br/><br/>

                <font>
                  Cody Alexander<br/>
                  Connor Wolanski<br/>
                  Yash Bhure<br/>
                  Rigoberto Canales Maldonado<br/>
                </font>
            </p>
            <p>
              <br/>
              <a href="https://docs.google.com/spreadsheets/d/1oB89hJ1GFzxqWqvS5EAoRzdsZX7hjpS6eOnHcdjmu2g/edit?usp=sharing" target="_blank">Click here for Log Sheet!</a>
              <br/>
              <a href="https://docs.google.com/document/d/1sDUOCYqBGxDh_UEdmFem4ufKH6Z9PKwI-xJBBrAMPlg/edit?usp=sharing" target="_blank">Click here for Software Requirement Specifications!</a>
              <br/>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="button2" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Members
