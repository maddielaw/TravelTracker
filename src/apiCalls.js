
const fetchCalls = {

  fetchData: function (urlPath) {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
      .then(response => response.json())
  }
}




export default fetchCalls;