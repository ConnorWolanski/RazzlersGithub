import React from "react";
import '../style.css';
class Movies extends React.Component {
  render() {
    return (
      <div>
      <h2><font color ="white" size = "50">Movies</font></h2>
      <button className="button2" onClick={() => window.location.href='PlayVideo?isMovie=true&id=1'}>PlayVideo</button>
      </div>
    );
  }
}
export default Movies
