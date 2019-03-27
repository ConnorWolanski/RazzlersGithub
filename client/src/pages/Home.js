import React from "react";
import '../style.css';
class Home extends React.Component {
  render() {
    printTest();
    return (
      <div>
      <h2><font color ="white" size = "50">Home</font></h2>
      </div>
    );
  }
}

function printTest()
{
  console.log(localStorage.getItem("Razzlers_Subscribed_Shows") + " : " + localStorage.getItem("Razzlers_Subscribed_Movies"));
}

export default Home
