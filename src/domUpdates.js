

//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate');
const totalTripCost = document.getElementById('totalTripCost');
const allTripsContainer = document.getElementById('allTrips');
const mainDashboard = document.getElementById('mainSection')
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pendingTripsContainer = document.getElementById('pendingTrips');
const notFoundMessage = document.getElementById('notFound');
const tripFormPage = document.getElementById('tripFormContainer')
const destinationDropDown = document.getElementById('tripDestination')





//DOM Updates -------------------------------------------------------------------------------------


let domUpdates = {

  updateWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName.toLowerCase()}`
  },
  updateTravelerProfile: function (data) {
    travelerName.innerText = data.currentTraveler.name;
    todayDate.innerText = `Today's Date: ${new Date().toLocaleDateString()}`;
  },
  updateTravelerSpending: function (data, cost) {
    totalTripCost.innerText = `You've spent $${cost} on trips this year`
  },
  updateTravelerTrips: function (trip, selector) {
    selector.innerHTML += `
      <div class="all-trips trip-card">
        <h3 class="trip-card-location trip-info" id="tripCardLocation">${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <h4 class="num-travelers trip-info" id="numTravelers">Travelers: ${trip.travelers}</h4>
        <h4 class="departure trip-info" id="departure">Departure Date: ${trip.date}</h4>
        <h4 class="duration trip-info" id="duration">Trip Duration: ${trip.duration} days</h4>
        <h4 class="trip-status trip-info" id="tripStatus">Trip Status: ${trip.status}</h4>
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
  displayDestinationDropDown: function (destination) {
    destinationDropDown.innerHTML += `
      <option value=${destination.destination} id=${destination.id} data-flight-cost=${destination.estimatedFlightCostPerPerson} data-lodging-cost=${destination.estimatedLodgingCostPerDay}>${destination.destination}</option>
    `
  }


};










export default domUpdates;