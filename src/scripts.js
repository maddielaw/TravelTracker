import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';
import TravelDatabase from './TravelDatabase';


//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', displayDashboard)



// Main Functions -------------------------------------------------------------------------------------------


function displayDashboard() {
  createDashboard(2)
} 

function createDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerData(travelDatabase)
  })
}


function displayTravelerData(data) {
  domUpdates.displayWelcomeMessage(data)
  domUpdates.displayTravelerProfile(data)
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
};


// Traveler profile -------------------------------------------------------------------------------------------

function createTraveler(data, id) {
  const newTraveler = data.findATraveler(id);
  newTraveler.findPastTrips();
  newTraveler.findPendingTrips();
  newTraveler.findUpcomingTrips();
  newTraveler.findCurrentTrip();
  return newTraveler
}

