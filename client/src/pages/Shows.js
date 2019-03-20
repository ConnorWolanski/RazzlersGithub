import React from "react";
import '../style.css';
import ShowList from "../HTMLComponents/ShowList";

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
    if(showList !== 0)
    {
      return (
        <div>
            <p className="centerTextWithBack"><font color ="black" size="1000">Shows</font></p>
            <ShowList shows={showList}></ShowList>
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
