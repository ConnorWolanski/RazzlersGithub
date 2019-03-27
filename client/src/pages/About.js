import React from "react";
import '../style.css';
class About extends React.Component {
  render() {
    return (
      <div className ="bg2_center">
        <font size ="20" color="black">About</font>
        <font color="black"><u><b>Team Members:</b></u><br/></font>
        <p>
            <font color= "black">
              Cody Alexander<br/>
              Connor Wolanski<br/>
              Yash Bhure<br/>
              Rigoberto Canales Maldonado<br/>
            </font>
        </p>
        <p>
          <br/>
          <a href="https://docs.google.com/spreadsheets/d/1oB89hJ1GFzxqWqvS5EAoRzdsZX7hjpS6eOnHcdjmu2g/edit?usp=sharing" ><font color= "blue">Click here for Log Sheet!</font></a>
          <br/>
          <a href="https://docs.google.com/document/d/1sDUOCYqBGxDh_UEdmFem4ufKH6Z9PKwI-xJBBrAMPlg/edit?usp=sharing"><font color= "blue">Click here for Software Requirement Specifications!</font></a>
          <br/>
        </p>
      </div>
    );
  }
}
export default About
