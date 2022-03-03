import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';


//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', loadDashboard)



// Main Functions -------------------------------------------------------------------------------------------

function loadDashboard() {
  resolvePromise().then(allData => {
    console.log(allData)
  })
}




//API & Promise Handling -------------------------------------------------------------------------------------------------

function resolvePromise() {
  const allTravelerData = fetchCalls.fetchData('travelers');
  const allTripData = fetchCalls.fetchData('trips');
  const allDestinationData = fetchCalls.fetchData('destinations');
  return Promise.all([allTravelerData, allTripData, allDestinationData])
    .then(data => {
      let allData = {}
      allData.allTravelers = data[0].travelers;
      allData.allTrips = data[1].trips;
      allData.allDestinations = data[2].destinations;
      return allData
    })
}
