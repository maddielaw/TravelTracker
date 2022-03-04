import './css/styles.css';
import './images/turing-logo.png';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';
import TravelDatabase from './TravelDatabase';


//Selector Variables -------------------------------------------------------------------------------------

const bookTripBtn = document.getElementById('bookNowButton')
const backToMainBtn = document.getElementById('backToMain')
const quoteBtn = document.getElementById('quoteButton')
const tripSubmitBtn = document.getElementById('submitButton')

const allTripsContainer = document.getElementById('allTrips');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pendingTripsContainer = document.getElementById('pendingTrips');

const newTripForm = document.getElementById('newTripForm')
const formDepartureDate = document.getElementById('departureDate');
const formTripDuration = document.getElementById('tripDuration');
const formNumTravelers = document.getElementById('numTravelers');
const destinationDropDown = document.getElementById('tripDestination');
const tripQuote = document.getElementById('tripQuote')

const filterBtnContainer = document.getElementById('tripFilterContainer')


//Event Listeners -------------------------------------------------------------------------------------

window.addEventListener('load', displayDashboard)
filterBtnContainer.addEventListener('click', displayDashboard);

bookTripBtn.addEventListener('click', displayAndHideTripForm);
backToMainBtn.addEventListener('click', displayAndHideTripForm);

newTripForm.addEventListener('submit', getTripQuote)


// Main Functions -------------------------------------------------------------------------------------------

function displayDashboard(e) {
  createDashboardView(33, e)
};

function createDashboardView(id, e) {
  resolvePromise().then(allData => {
    const travelDatabase = new TravelDatabase(allData);
    createTraveler(travelDatabase, id);
    displayTravelerProfile(travelDatabase);
    createDestinationList(travelDatabase);
    filterBtnGatekeeper(e, travelDatabase)
  });
};


function filterBtnGatekeeper(e, data) {
  if (e.target.id === 'allTripsButton') {
    displayAllTravelerTrips(data, allTripsContainer, data.currentTraveler.travelerTrips);
    domUpdates.showItem(allTripsContainer);
    domUpdates.hideItem(upcomingTripsContainer);
    domUpdates.hideItem(pendingTripsContainer);
  } if (e.target.id === 'upcomingTripsButton') {
    displayAllTravelerTrips(data, upcomingTripsContainer, data.currentTraveler.upcomingTrips);
    domUpdates.showItem(upcomingTripsContainer);
    domUpdates.hideItem(allTripsContainer);
    domUpdates.hideItem(pendingTripsContainer);
  } else if (e.target.id === 'pendingTripsButton') {
    displayAllTravelerTrips(data, pendingTripsContainer, data.currentTraveler.pendingTrips);
    domUpdates.showItem(pendingTripsContainer);
    domUpdates.hideItem(allTripsContainer);
    domUpdates.hideItem(upcomingTripsContainer);
  } else {
    displayAllTravelerTrips(data, allTripsContainer, data.currentTraveler.travelerTrips);
    domUpdates.showItem(allTripsContainer);
    domUpdates.hideItem(upcomingTripsContainer);
    domUpdates.hideItem(pendingTripsContainer);
  };
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

function displayAllTravelerTrips(data, selector, arr) {
  domUpdates.hideNotFoundMessage();
  if (!arr.length) {
    domUpdates.displayNotFoundMessage()
  } else {
    selector.innerHTML = ""
    arr.forEach(trip => {
      domUpdates.updateTravelerTrips(trip, selector)
    });
  }
};

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

function getTripQuote(e) {
  e.preventDefault()
  if (new Date(formDepartureDate.value).toLocaleDateString() < new Date().toLocaleDateString()) {
    console.log("pick a date in the future!")
  } else {
    domUpdates.showItem(tripSubmitBtn);
    domUpdates.showItem(tripQuote);
    domUpdates.hideItem(quoteBtn);
  }
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



export default handleServerErrors;