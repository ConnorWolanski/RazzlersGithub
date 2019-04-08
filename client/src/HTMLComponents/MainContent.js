import React from "react";

function MainContent()
{
  return (
    <main>
      This is the main567654565...
      <br></br>
      Dump:
      <br></br>
      <p id="testDataDump"></p>
      <script>
        var test = "321";
        console.log(test);
        var testData = "123";
        fetch("http://razzlers.me:3001/api/getData", {mode: 'no-cors'}).then(function(response){
          console.log(response.text());
          // testData = JSON.stringify(response);
        });
        console.log(testData);
        document.getElementById("testDataDump").innerHTML = test;
      </script>
    </main>
  )
}

// function getTheData()
// {
//   var testData = "123";
//   fetch("http://localhost:3001/api/getData", {mode: 'no-cors'}).then(function(response){
//     console.log(response.text());
//     // testData = JSON.stringify(response);
//   });
//   console.log(testData);
//   return testData;
// }

export default MainContent
