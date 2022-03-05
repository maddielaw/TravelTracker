import { handleServerErrors, checkForErrors } from "./scripts";

const fetchCalls = {

  fetchData: function (urlPath) {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
      .then(response => response.json())
      .catch(err => handleServerErrors(err))
  },
  postData: function(urlPath, newData) {
    fetch(`http://localhost:3001/api/v1/${urlPath}`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {'Content-Type': 'application/json'}
    })
        .then(response => checkForErrors(response))
        .catch(err => handleServerErrors(err))
  }
};




export default fetchCalls;