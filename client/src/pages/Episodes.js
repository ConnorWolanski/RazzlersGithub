import React from "react";
import '../style.css';
import EpisodeList from "../HTMLComponents/EpisodeList";

const utilFunc = require('../Helpers/UtilityFunctions');

class Shows extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      episodeList: 0,
	  id:0,
	  showTitle:""
    };
	
	checkParams().then(json => {
      this.setState({
        id: json.id,
      });
	  
      var id = json.id;
	  utilFunc.getEpisodeList(id).then(result => {
		this.setState({ episodeList: result });
		
		var set = {};
		getShowInfo(id).then(result => {
			set = result;
			this.setState({
				showTitle: set.title
			});
		});
	  });
    });
  }
  render() {
    const {episodeList, showTitle} = this.state;
    if(episodeList !== 0)
    {
      return (
        <div>
            <p className="centerTextWithBackLonger"><font color ="black" size="1000">{showTitle}</font></p>
            <EpisodeList episodes={episodeList}></EpisodeList>
        </div>
      );
    }
    return(<div></div>)
  }
}

function checkParams()
{
  return new Promise(function(resolve, reject)
  {
    var url = window.location.href;
    url = new URL(url);
    var id = url.searchParams.get("id");
    resolve({id});
  });
}


function getShowInfo(id)
{
  return new Promise(function(resolve, reject)
  {
    var data = '{"id": "' + id + '"}';
    data = JSON.parse(data);
    var transport = {
      headers: {
        'Content-Type': "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    };
    const url = "http://localhost:3001/api/getData/getShowInfo";
    fetch(url, transport).then(result => result.json()).then(json => {
      resolve(json);
    }).catch(err => {
      throw new Error(err);
    });
  });
}

export default Shows
