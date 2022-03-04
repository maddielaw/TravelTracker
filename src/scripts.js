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
const dateErrorMsg = document.getElementById('dateError')
const formErrorTag = document.getElementById('formErrors')
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

quoteBtn.addEventListener('click', displayTripQuote)
newTripForm.addEventListener('submit', packageNewTrip)



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

function displayTripQuote(e) {
  e.preventDefault()
  if (formDepartureDate.value < new Date().toISOString().split('T')[0]) {
    domUpdates.displayDateError()
    // dateErrorMsg.innerText = "Please pick a date in the future!"
  } else if (formNumTravelers.value <= 0 || !formNumTravelers.value) {
    domUpdates.displayFormError()
  } else if (formTripDuration.value <= 0 || !formTripDuration.value) {
    domUpdates.displayFormError()
  } else {
    handleTripQuote()
  }
}

function handleTripQuote() {
  domUpdates.showItem(tripSubmitBtn);
  domUpdates.showItem(tripQuote);
  domUpdates.hideItem(quoteBtn);
  dateErrorMsg.innerText = "";
  formErrorTag.innerText = "";
  domUpdates.displayCostEstimate(getNewTripCost())
}

function getNewTripCost() {
  const lodgingPerDay = parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].dataset.lodging)
  const flightPerPerson = parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].dataset.flight)

  const lodgingTotal = lodgingPerDay * parseInt(formTripDuration.value)
  const flightTotal = (flightPerPerson * 2) * parseInt(formNumTravelers.value)

  const baseTotal = lodgingTotal + flightTotal
  const finalTripQuote = baseTotal + (baseTotal * .10)

  return finalTripQuote
}


function displayTripRequstSuccess() {

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

function packageNewTrip(e) {
  e.preventDefault();
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

function checkForErrors(response) {
  if (response.ok) {
    formErrorTag.innerText = "";
    return response.json()
  } else {
    throw new Error("Make sure you fill out all form fields!")
  }
}



export { handleServerErrors, checkForErrors };