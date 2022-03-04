import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';
import TravelDatabase from './TravelDatabase';


//Selector Variables -------------------------------------------------------------------------------------

const allTripsBtn = document.getElementById('allTripsButton');
const upcomingTripsBtn = document.getElementById('upcomingTripsButton');
const pendingTripsBtn = document.getElementById('pendingTripsButton');
const bookTripBtn = document.getElementById('bookNowButton')
const backToMainBtn = document.getElementById('backToMain')
const quoteBtn = document.getElementById('quoteButton')

const allTripsContainer = document.getElementById('allTrips');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pendingTripsContainer = document.getElementById('pendingTrips');

const formDepartureDate = document.getElementById('departureDate');
const formTripDuration = document.getElementById('tripDuration');
const formNumTravelers = document.getElementById('numTravelers');
const destinationDropDown = document.getElementById('tripDestination');


//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', displayMainDashboard)

allTripsBtn.addEventListener('click', displayMainDashboard);
upcomingTripsBtn.addEventListener('click', displayUpcomingDashboard);
pendingTripsBtn.addEventListener('click', displayPendingDashboard);

bookTripBtn.addEventListener('click', displayAndHideTripForm);
backToMainBtn.addEventListener('click', displayAndHideTripForm);

quoteBtn.addEventListener('click', packageNewTrip)




// Main Functions -------------------------------------------------------------------------------------------


function displayMainDashboard() {
  createMainDashboardView(33)
};

function displayUpcomingDashboard() {
  createUpcomingDashboard(33)
};

function displayPendingDashboard() {
  createPendingDashboard(33)
};


function createMainDashboardView(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerProfile(travelDatabase);
    displayTravelerTrips(travelDatabase, allTripsContainer, travelDatabase.currentTraveler.travelerTrips);
    createDestinationList(travelDatabase);
    showItem(allTripsContainer);
    hideItem(upcomingTripsContainer);
    hideItem(pendingTripsContainer);
  });
};

function createUpcomingDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerProfile(travelDatabase)
    displayTravelerTrips(travelDatabase, upcomingTripsContainer, travelDatabase.currentTraveler.upcomingTrips);
    showItem(upcomingTripsContainer);
    hideItem(allTripsContainer);
    hideItem(pendingTripsContainer);
  });
};

function createPendingDashboard(id) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerProfile(travelDatabase)
    displayTravelerTrips(travelDatabase, pendingTripsContainer, travelDatabase.currentTraveler.pendingTrips);
    showItem(pendingTripsContainer);
    hideItem(allTripsContainer);
    hideItem(upcomingTripsContainer);
  });
};

function displayTravelerProfile(data) {
  displayTravelerData(data)
  displayTravelerSpending(data)
};


// Traveler profile -------------------------------------------------------------------------------------------

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

// Filter trips  -------------------------------------------------------------------------------------------

function displayTravelerTrips(data, selector, arr) {
  domUpdates.hideNotFoundMessage();
  domUpdates.showItem(selector);
  domUpdates.hideItem(selector);
  domUpdates.hideItem(selector);
  if (!arr.length) {
    domUpdates.displayNotFoundMessage()
  } else {
    selector.innerHTML = ""
    arr.forEach(trip => {
      domUpdates.updateTravelerTrips(trip, selector)
    });
  }
};






// function displayUpcomingTravelerTrips(data) {
//   domUpdates.hideNotFoundMessage();
//   showItem(upcomingTripsContainer);
//   hideItem(allTripsContainer);
//   hideItem(pendingTripsContainer);
//   const upcomingTravelerTrips = data.currentTraveler.upcomingTrips;
//   if (!upcomingTravelerTrips.length) {
//     domUpdates.displayNotFoundMessage()
//   } else {
//     upcomingTripsContainer.innerHTML = ""
//     upcomingTravelerTrips.forEach(trip => {
//       domUpdates.updateUpcomingTravelerTrips(trip)
//     });
//   }
// };

// function displayPendingTravelerTrips(data) {
//   domUpdates.hideNotFoundMessage();
//   showItem(pendingTripsContainer);
//   hideItem(allTripsContainer);
//   hideItem(upcomingTripsContainer);
//   const pendingTravelerTrips = data.currentTraveler.pendingTrips;
//   if (!pendingTravelerTrips.length) {
//     domUpdates.displayNotFoundMessage()
//   } else {
//     pendingTripsContainer.innerHTML = "";
//       pendingTravelerTrips.forEach(trip => {
//         domUpdates.updatePendingTravelerTrips(trip)
//       });
//   };
// };


// Form Page  -------------------------------------------------------------------------------------------

function displayAndHideTripForm() {
  domUpdates.displayAndHideFormPage()
};

function createDestinationList(data) {
  destinationDropDown.innerHTML = "";
  data.destinations.forEach(destination => {
    domUpdates.displayDestinationDropDown(destination)
  })
}

//API & Promise Handling ------------------------------------------------------------------------------------------------

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


function packageNewTrip() {
  const newTripData = {
    id: Date.now(),
    userID: 33,
    destinationID: parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].id),
    travelers: parseInt(formNumTravelers.value),
    date: formDepartureDate.value.split('-').join('/'),
    duration: parseInt(formTripDuration.value),
    status: 'pending',
    suggestedActivities: []
  };
  fetchCalls.postData('trips', newTripData);
}



function handleServerErrors(error) {
  if (error.message === "Failed to fetch") {
    window.alert("Oops! Something went wrong.")
  }
}


// Helpers  -------------------------------------------------------------------------------------------

function hideItem(selector) {
  selector.classList.add('hidden')
}

function showItem(selector) {
  selector.classList.remove('hidden')
}





export default handleServerErrors;