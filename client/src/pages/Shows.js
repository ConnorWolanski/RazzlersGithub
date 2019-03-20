import React from "react";
import '../style.css';
class Shows extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      showList: 0
    };
    getShowList().then(result => {
      this.setState({ showList: result });
    });
  }
  render() {
    const {showList} = this.state;
    if(showList !== 0){
      console.log(showList)
    return (
      <div>
        <h2><font color ="white" size = "50">shows</font></h2>
          <MovieCard movie={movieList[0]}></MovieCard>
        <button className="button2" onClick={() => window.location.href='PlayVideo?isMovie=false&id=1'}>PlayVideo</button>
      </div>
    );
    }
    return(<div></div>)
  }
}


function getShowList()
{
  return new Promise(function(resolve, reject)
  {
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "GET"
    };
    const url = "http://localhost:3001/api/getData/getShowList";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Shows
