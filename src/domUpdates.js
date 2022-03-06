import { formatDate } from "./scripts";


//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate');
const totalTripCost = document.getElementById('totalTripCost');
const allTripsContainer = document.getElementById('allTrips');
const mainDashboard = document.getElementById('mainSection')
const upcomingTripsContainer = document.getElementById('upcomingTrips');

const notFoundMessage = document.getElementById('notFound');
const tripFormPage = document.getElementById('tripFormContainer')
const currentTravelerID = document.getElementById('currentTravelerID')
const destinationDropDown = document.getElementById('tripDestination')
const tripQuote = document.getElementById('tripQuote')
const successMsg = document.getElementById('successMsg')

const dateErrorMsg = document.getElementById('dateError')
const formErrorTag = document.getElementById('formErrors')

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

//DOM Updates -------------------------------------------------------------------------------------


let domUpdates = {

  updateWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName.toLowerCase()}`
  },
  updateTravelerProfile: function (data) {
    travelerName.innerText = data.currentTraveler.name;
    todayDate.innerText = `${new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric',})}`;
  },
  updateTravelerSpending: function (data, cost) {
    totalTripCost.innerText = `You've spent $${cost}.00 on trips this year`
  },
  updateTravelerTrips: function (trip, selector) {
    selector.innerHTML += `
      <div class="all-trips trip-card">
        <h3 class="trip-card-location trip-info" id=${trip.id}>${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <div class="trip-info-container">
          <h4 class="num-travelers" id=${trip.id}>Travelers: ${trip.travelers}</h4>
          <h4 class="num-travelers" id=${trip.id}>Travelers: ${trip.travelers}</h4>
          <h4 class="departure" id=${trip.id}>Departure Date: ${formatDate(trip.date)}</h4>
          <h4 class="duration" id=${trip.id}>Trip Duration: ${trip.duration} days</h4>
          <h4 class="trip-status" id=${trip.id}>Trip Status: ${trip.status}</h4>
        </div>
      </div>`
  },
  showItem: function (selector) {
    selector.classList.remove('hidden')
  },
  hideItem: function (selector) {
    selector.classList.add('hidden')
  },
  displayNotFoundMessage: function () {
    notFoundMessage.classList.remove('hidden')
    allTripsContainer.classList.add('hidden');
    upcomingTripsContainer.classList.add('hidden');
  },
  hideNotFoundMessage: function () {
    notFoundMessage.classList.add('hidden')
  },
  displayAndHideFormPage: function () {
    mainDashboard.classList.toggle('hidden');
    tripFormPage.classList.toggle('hidden')
  },
  addTravelerIDToForm: function(id) {
    currentTravelerID.innerText = id
  },
  displayDestinationDropDown: function (destination) {
    destinationDropDown.innerHTML += `
      <option value=${destination.destination} id=${destination.id} data-flight=${destination.estimatedFlightCostPerPerson} data-lodging=${destination.estimatedLodgingCostPerDay}>${destination.destination}</option>
    `
  },
  displayFormError: function () {
    formErrorTag.innerText = "Make sure you fill out all fields!"
  },
  displayDateError: function () {
    dateErrorMsg.innerText = "Please pick a date in the future!"
  },
  displayCostEstimate: function (cost) {
    tripQuote.innerText = `Your trip cost estimate for ${destinationDropDown.options[destinationDropDown.selectedIndex].text} is $${cost}.00`
  },
  displayFormSuccessMsg: function () {
    successMsg.innerText = `Trip request successful! You'll hear from your travel agent once it's been approved.`
  },
  validateUsername: function (letters, numbers) {
    if (letters !== 'traveler' || numbers === '0' || numbers === '00' || numbers === undefined || parseInt(numbers) > 50) {
      usernameInput.className = 'incorrect';
      usernameError.innerText = "username does not match"
    } 
    else {
      usernameInput.className = 'correct';
    };
  },
  validatePassword: function (password) {
    if (password !== "travel") {
      passwordInput.className = 'incorrect';
      passwordError.innerText = "password does not match"
    } else {
      passwordInput.className = 'correct';
    };
  }


};



export default domUpdates;