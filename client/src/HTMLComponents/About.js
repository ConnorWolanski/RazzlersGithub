import React from "react";
import '../style.css';
class Members extends React.Component {
  render() {
    return (
      <div>
        <font size= "26" color="white"><u><b>Team Members:</b></u><br/></font>
        <p>
          <br/><br/><br/>

            <font color= "white">
              Cody Alexander<br/>
              Connor Wolanski<br/>
              Yash Bhure<br/>
              Rigoberto Canales Maldonado<br/>
            </font>
        </p>
        <p>
          <br/>
          <a href="https://docs.google.com/spreadsheets/d/1oB89hJ1GFzxqWqvS5EAoRzdsZX7hjpS6eOnHcdjmu2g/edit?usp=sharing">Click here for Log Sheet!</a>
          <br/>
          <a href="https://docs.google.com/document/d/1sDUOCYqBGxDh_UEdmFem4ufKH6Z9PKwI-xJBBrAMPlg/edit?usp=sharing">Click here for Software Requirement Specifications!</a>
          <br/>
        </p>
      </div>
    );
  }
}
export default Members
