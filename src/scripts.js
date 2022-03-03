import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';
import TravelDatabase from './TravelDatabase';


//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', displayDashboard)



// Main Functions -------------------------------------------------------------------------------------------


function displayDashboard() {
  createDashboard(44)
} 

function createDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerData(travelDatabase)
    displayTravelerSpending(travelDatabase)
    displayAllTravelerTrips(travelDatabase)
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
};

function handleServerErrors(error) {
  if (error.message === "Failed to fetch") {
    window.alert("Oops! Something went wrong.")
  }
}


// Traveler profile & trips -------------------------------------------------------------------------------------------

function createTraveler(data, id) {
  const newTraveler = data.findATraveler(id);
  newTraveler.findPastTrips();
  newTraveler.findPendingTrips();
  newTraveler.findUpcomingTrips();
  newTraveler.findCurrentTrip();
  return newTraveler
};

function displayTravelerSpending(data) {
  const yearlyCost = data.currentTraveler.calculateYearlyTripCost()
  domUpdates.updateTravelerSpending(data, yearlyCost)
};

function displayTravelerData(data) {
  domUpdates.updateWelcomeMessage(data)
  domUpdates.updateTravelerProfile(data)
};


function displayAllTravelerTrips(data) {
  const allTravelerTrips = data.currentTraveler.travelerTrips;

  domUpdates.resetTripCardsInnerHTML();
  
  allTravelerTrips.forEach(trip => {
    console.log(trip)
    domUpdates.updateAllTravelerTrips(trip)
  })

}





export default handleServerErrors;