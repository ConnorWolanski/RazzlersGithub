import React from "react";
import '../style.css';
import ShowList from "../HTMLComponents/ShowList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Shows extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      showList: 0
    };
    utilFunc.getShowList().then(result => {
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

export default Shows
