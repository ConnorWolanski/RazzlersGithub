import React from "react";
import '../style.css';

class PlayVideo extends React.Component {
  render() {
    return (
      <div>
      <h2><font color ="white" size = "50">Test</font></h2>

      <video width="320" height="240" controls>
        <source src="//Razzlers.me///var/www/Razzlers_files/videos/movies/20.mp4" type="video/mp4"/>
      </video>


      </div>
    );
  }
}

export default PlayVideo
