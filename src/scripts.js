import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';
import TravelDatabase from './TravelDatabase';


//Selector Variables -------------------------------------------------------------------------------------

const allTripsBtn = document.getElementById('allTripsButton');
const upcomingTripsBtn = document.getElementById('upcomingTripsButton');
const pendingTripsBtn = document.getElementById('pendingTripsButton');

//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', displayMainDashboard)

// allTripsBtn.addEventListener('click', );
upcomingTripsBtn.addEventListener('click', displayUpcomingDashboard);
// pendingTripsBtn.addEventListener('click', );



// Main Functions -------------------------------------------------------------------------------------------


function displayMainDashboard() {
  createDashboard(33)
}

function displayUpcomingDashboard() {
  createUpcomingDashboard(33)
}




function createDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerData(travelDatabase)
    displayTravelerSpending(travelDatabase)
    displayAllTravelerTrips(travelDatabase)
    console.log(travelDatabase.currentTraveler)
  });
};

function createUpcomingDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerData(travelDatabase);
    displayTravelerSpending(travelDatabase);
    displayUpcomingTravelerTrips(travelDatabase);
  });
};






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
  domUpdates.resetAllTripsInnerHTML();
  allTravelerTrips.forEach(trip => {
    domUpdates.updateAllTravelerTrips(trip)
  });
};

function displayUpcomingTravelerTrips(data) {
  const upcomingTravelerTrips = data.currentTraveler.upcomingTrips;
  domUpdates.resetUpcomingTripsInnerHTML();
  upcomingTravelerTrips.forEach(trip => {
    domUpdates.updateUpcomingTravelerTrips(trip)
  })
}





export default handleServerErrors;